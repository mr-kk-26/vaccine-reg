const mongoose = require("mongoose");

//slots(document)
//
const slotSchema = new mongoose.Schema({
  date: String,
  time: String,
  availableSlots: {
    type: Number
  },
  firstDose: {
    type: Number
  },
  secondDose: {
    type: Number
  }
},{versionkey : false});

const slotModel = mongoose.model("slot", slotSchema);

async function main() {
  try {
    await mongoose.connect(
        "mongodb+srv://kiranSai:0fiN1h8yYM8F8OJK@vaccineregistration.sksuuit.mongodb.net/vaccineRegistration"
        );
    console.log("connected");
    for (let i = 1; i<22; i++) {
        const date = new Date(`${i} Jun 2022`);
        for (let j = 0; j <14; j++) {
            //time slots 10:30 - 11:30, 12:30 - 1:30 , 2:30 - 3:30
            let time;
            switch (j) {
                case 0:
                time = "10:00 am - 10:30 am"
                break
                case 1:
                time = "10:30 am - 11:00 am"
                break
                case 2:
                time = "11:00 am - 11:30 am"
                break
                case 3:
                time = "11:30 am - 12:00 am"
                break
                case 4:
                time = "12:00 pm - 12:30 pm"
                break
                case 5:
                time = "12:30 pm - 1:00 pm"
                break
                case 6:
                time = "1:00 pm - 1:30 pm"
                break
                case 7:
                time = "1:30 pm - 2:00 pm"
                break
                case 8:
                time = "2:00 pm - 2:30 pm"
                break
                case 9:
                time = "2:30 pm - 3:00 pm"
                break
                case 10:
                time = "3:00 pm - 3:30 pm"
                break
                case 11:
                time = "3:30 pm - 4:00 pm"
                break
                case 12:
                time = "4:00 pm - 4:30 pm"
                break
                case 13:
                time = "4:30 pm - 5:00 pm"
            }

            const slot = new slotModel({date: date.toDateString(), firstDose :0, secondDose:0, availableSlots: 10, time});
            await slot.save()
            console.log(`${i}-${time}: ${slot}`)
        }
    }
  } catch (err) {
    console.log(err);
  }
}

main();