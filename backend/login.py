from flask import Blueprint, request
from db import get_connection

login_bp = Blueprint("login", __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    mobile = data.get("mobile")
    aadhar = data.get("aadhar")

    con = get_connection()
    cursor = con.cursor(dictionary=True)

    cursor.execute(
        "SELECT account_number FROM holder_details WHERE mobile=%s AND aadhar=%s",
        (mobile, aadhar)
    )

    user = cursor.fetchone()
    con.close()

    if user:
        return {"account_number": user["account_number"]}
    else:
        return {"error": "Invalid details"}