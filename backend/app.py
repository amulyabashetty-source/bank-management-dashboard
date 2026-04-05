from flask import Flask, request, jsonify
from flask_cors import CORS
from bank import BANK
from db import get_connection

app = Flask(__name__)

# ✅ CORS (clean + enough)
CORS(app)

bank = BANK()

# ---------------- BASIC ----------------
@app.route("/")
def home():
    return "Bank API Running"


# ---------------- LOGIN ----------------
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    mobile = data.get("mobile")
    aadhar = data.get("aadhar")

    # remove spaces from DB compare
    aadhar = aadhar.replace(" ", "")

    con = get_connection()
    cursor = con.cursor(dictionary=True)

    cursor.execute(
        "SELECT account_number FROM holder_details WHERE mobile=%s AND REPLACE(aadhar,' ','')=%s",
        (mobile, aadhar)
    )

    user = cursor.fetchone()
    con.close()

    if user:
        return jsonify({"account_number": user["account_number"]})
    else:
        return jsonify({"error": "Invalid details"})


# ---------------- CORE APIs ----------------
@app.route("/create-account", methods=["POST"])
def create_account():
    return jsonify(bank.create_account_api(request.json))


@app.route("/deposit", methods=["POST"])
def deposit():
    return jsonify(bank.deposit_api(request.json))


@app.route("/withdraw", methods=["POST"])
def withdraw():
    return jsonify(bank.withdraw_api(request.json))


@app.route("/balance", methods=["POST"])
def balance():
    return jsonify(bank.check_balance_api(request.json))


# ---------------- DASHBOARD ----------------
@app.route("/transactions/<int:acc>", methods=["GET"])
def get_transactions(acc):
    con = get_connection()
    cursor = con.cursor()

    cursor.execute(
        "SELECT type, amount, date FROM transactions WHERE account_number=%s ORDER BY date DESC LIMIT 20",
        (acc,)
    )

    data = cursor.fetchall()
    con.close()

    result = []
    for row in data:
        result.append({
            "type": row[0],
            "amount": float(row[1]),
            "date": str(row[2])
        })

    return jsonify({"transactions": result})


@app.route("/balance/<int:acc>", methods=["GET"])
def get_balance(acc):
    con = get_connection()
    cursor = con.cursor()

    cursor.execute(
        "SELECT balance FROM holder_details WHERE account_number=%s",
        (acc,)
    )

    data = cursor.fetchone()
    con.close()

    if data:
        return jsonify({"balance": float(data[0])})
    else:
        return jsonify({"error": "Account not found"})


@app.route('/user/<int:acc>', methods=['GET'])
def get_user(acc):
    con = get_connection()
    cursor = con.cursor(dictionary=True)

    cursor.execute(
        "SELECT name, account_number, balance FROM holder_details WHERE account_number=%s",
        (acc,)
    )

    user = cursor.fetchone()
    con.close()

    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"})


# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)