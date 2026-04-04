from flask import Flask, request, jsonify
from flask_cors import CORS
from bank import BANK
from db import get_connection   # ✅ IMPORTANT FIX

app = Flask(__name__)
CORS(app)

bank = BANK()

# ---------------- BASIC ----------------
@app.route("/")
def home():
    return "Bank API Running"


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


# ---------------- DASHBOARD APIs ----------------
@app.route("/transactions/<int:acc>", methods=["GET"])
def get_transactions(acc):
    con = get_connection()
    cursor = con.cursor()

    cursor.execute(
    "SELECT Type, Amount, Transaction_Time FROM transactions WHERE Account_Number=%s ORDER BY Transaction_Time DESC LIMIT 20",
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
        "SELECT Balance FROM holder_details WHERE Account_Number=%s",
        (acc,)
    )

    data = cursor.fetchone()
    con.close()

    if data:
        return jsonify({"balance": float(data[0])})
    else:
        return jsonify({"error": "Account not found"})


# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)