import random
from db import get_connection

class BANK:

    def account_exists(self, acc):
        con = get_connection()
        cursor = con.cursor()

        cursor.execute(
    "SELECT account_number FROM holder_details WHERE account_number=%s",
    (acc,)
)

        data = cursor.fetchone()
        con.close()
        return data

    def create_account_api(self, data):
        con = get_connection()
        cursor = con.cursor()

        name = data["name"]
        age = int(data["age"])
        mobile = data["mobile"]
        aadhar = data["aadhar"]
        account_type = data["account_type"]

        balance = 1000 if account_type == "saving" else 500

        account_no = random.randint(10**7, 10**9 - 1)

        cursor.execute(
            "SELECT * FROM holder_details WHERE aadhar=%s",
            (aadhar,)
        )

        existing = cursor.fetchone()

        if existing:
            con.close()
            return {"error": "Account already exists with this Aadhar"}
                
        cursor.execute("""
            INSERT INTO holder_details
            (account_number, account_type, name, age, mobile, aadhar, balance)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (
                account_no, account_type, name, age, mobile, aadhar, balance
            ))

        con.commit()
        con.close()

        return {"message": "Account Created", "account_number": account_no}


    def deposit_api(self, data):

        con = get_connection()
        cursor = con.cursor()

        acc = int(data["account_number"])
        amount = float(data["amount"])

        if not self.account_exists(acc):
            return {"error": "Account not found"}

        # ✅ Update balance
        cursor.execute(
            "UPDATE holder_details SET balance = balance + %s WHERE account_number=%s",
            (amount, acc)
        )

        # ✅ INSERT TRANSACTION (THIS WAS MISSING)
        cursor.execute(
            "INSERT INTO transactions(account_number, type, amount, date) VALUES (%s, %s, %s, NOW())",
            (acc, "Deposit", amount)
        )

        con.commit()
        con.close()

        return {"message": "Deposit successful"}


    def withdraw_api(self, data):
        con = get_connection()
        cursor = con.cursor()

        acc = int(data["account_number"])
        amount = float(data["amount"])

        # check account
        cursor.execute(
            "SELECT balance FROM holder_details WHERE account_number=%s",
            (acc,)
        )

        result = cursor.fetchone()

        if not result:
            con.close()
            return {"error": "Account not found"}

        balance = result[0]

        if amount > balance:
            con.close()
            return {"error": "Insufficient balance"}

        # update balance
        cursor.execute(
            "UPDATE holder_details SET balance = balance - %s WHERE account_number=%s",
            (amount, acc)
        )

        # insert transaction
        cursor.execute(
            "INSERT INTO transactions(account_number, type, amount, date) VALUES (%s, %s, %s, NOW())",
            (acc, "Withdraw", amount)
        )

        con.commit()
        con.close()

        return {"message": "Withdraw successful"}


    def check_balance_api(self, data):
        con = get_connection()
        cursor = con.cursor()

        acc = int(data["account_number"])

        cursor.execute(
            "SELECT balance FROM holder_details WHERE account_number=%s",
            (acc,)
        )        

        result = cursor.fetchone()
        con.close()

        if result:
            return {"balance": result[0]}
        else:
            return {"error": "Account not found"}