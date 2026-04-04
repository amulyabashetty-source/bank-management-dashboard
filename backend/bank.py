import random
from db import get_connection


class BANK:

    def account_exists(self, acc):
        con = get_connection()
        cursor = con.cursor()

        cursor.execute(
            "SELECT Account_Number FROM holder_details WHERE Account_Number=%s",
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

        account_no = random.randint(10**9, 10**10 - 1)

        cursor.execute("""
        INSERT INTO holder_details
        (Account_Number,Account_Type,Holder_Name,Age,Mobile,Aadhar,IFSC,Balance)
        VALUES(%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            account_no, account_type, name, age, mobile, aadhar, "IFSC0123", balance
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
            "UPDATE holder_details SET Balance = Balance + %s WHERE Account_Number=%s",
            (amount, acc)
        )

        # ✅ INSERT TRANSACTION (THIS WAS MISSING)
        cursor.execute(
            "INSERT INTO transactions(Account_Number, Type, Amount) VALUES (%s, %s, %s)",
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

        if not self.account_exists(acc):
            return {"error": "Account not found"}

        cursor.execute(
            "SELECT Balance FROM holder_details WHERE Account_Number=%s",
            (acc,)
        )
        balance = cursor.fetchone()[0]

        if amount > balance:
            return {"error": "Insufficient balance"}

        cursor.execute(
            "UPDATE holder_details SET Balance = Balance - %s WHERE Account_Number=%s",
            (amount, acc)
        )

        cursor.execute(
            "INSERT INTO transactions(Account_Number,Type,Amount) VALUES(%s,%s,%s)",
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
            "SELECT Balance FROM holder_details WHERE Account_Number=%s",
            (acc,)
        )

        result = cursor.fetchone()
        con.close()

        if result:
            return {"balance": result[0]}
        else:
            return {"error": "Account not found"}