# Project Title

vaccine registration



TO start the application
----node server.js

api end points


user validations are done by jwt, provided in headers as X-access-TOken


-----------------------------To signup----------------------------------------------------------------------------------
 app.post("/vr/api/v1/auth/signup")

provide json
eg:  {
    "name": "ram",
    "password": "ram",
    "phoneNumber": 2432423424,
    "age": 25,
    "pincode": 20202,
    "aadhar_No": 32413435345435
}


-----------------------------------To signin-----------------------------------------------------------------------------------------                                               
app.post("/vr/api/v1/auth/signin")

provide json

eg: {
    
    "password": "ram",
    "phoneNumber": 2432423424
  
}


---------------------------------- for booking slots-------------------------------------------------------------------------------------------
app.post("/vr/api/v1/slots/booking/:_id")

provide slot-id in params

eg:   http://localhost:8080/vr/api/v1/slots/booking/6344d191466adb76b49a0500



------------------------------------to get users--- only for admin ------------------------------------------------------------------
app.get("/vr/api/v1/users/getUsers")

provide json  and query

eg: json  {
    "name": "admin",
    "password": "admin"   
}

      query          http://localhost:8080/vr/api/v1/users/getUsers?age=25
      in query age, pincode, doseBooked, doseTaken can also be used as filters for getting users
      
------------------------------------ to get slots --- only for admin-----------------------------------------------------------
app.get("/vr/api/v1/slots")

can  query by Date, firstDose, secondDose 

eg:  http://localhost:8080/vr/api/v1/slots?date=2022-06-04


---------------------------------------to get slots by date ------------------------------------------------------------
app.get("/vr/api/v1/slots/:date")

can query  by date as params

eg: http://localhost:8080/vr/api/v1/slots/2022-06-04

----------------------------------------to update slots-----------------------------------------------------------------------------
app.put("/vr/api/v1/slots/update/:_id")

prove the id of the slot in params that need to be updated

and as json

eg: {
    "doseBooked": "second dose"

}






