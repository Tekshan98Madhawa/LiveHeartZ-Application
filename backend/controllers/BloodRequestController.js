import BloodRequest from "../models/BloodRequest.js";


export const createBloodRequest = async (req, res) => {

    try {

        const { patientname, email, mobile, othermsg, bloodgroup, gender, hospitalname, contactname, doctorname, datewhenneed, province, district, nic, tandc } = req.body;
        const bloodRequest = new BloodRequest({
            patientname,
            doctorname,
            bloodgroup,
            gender,
            hospitalname,
            contactname,
            othermsg,
            email,
            datewhenneed,
            province,
            district,
            mobile,
            nic,
            tandc,
            verified: false
        });


        await bloodRequest.save();

        res.status(200).json({ success: true, message: 'Sucsessfully Data Added' });

    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}

export const requestsByBloodGroup = async (req, res) => {

    try {
        const filter = { bloodgroup: req.params.blood };

        const requests = await BloodRequest.find(filter);

        res.status(200).json(requests);

    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}

export const Allrequests = async (req, res) => {

    try {

        const requests = await BloodRequest.find();

        res.status(200).json(requests);

    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}
export const getTotalRequestsCount = async (req, res) => {
    try {
        const totalRequestsCount = await BloodRequest.countDocuments();
        res.status(200).json({ success: true, count: totalRequestsCount });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
