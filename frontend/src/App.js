import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
    const [formData, setFormData] = useState({
        hubAttended: "",
        dateAttended: "",
        hubWorker: "",
        howFound: "",
        ageBand: "",
        postcode: "",
        gender: "",
        ethnicity: "",
        ethnicityDetail: "",
        conclusion1: "",
        conclusion2: "",
        conclusion3: "",
        notes: "",
        coping: 0,
        connected: 0,
        control: 0,
        safe: 0,
        support: 0,
        satisfaction: 0,
        venue: 0,
        welcome: 0,
        accessibility: 0,
        info: 0,
        outcome: 0,
        recommend: 0,
        issue: ""
    });

    const ethnicityOptions = {
        "White": ["English / Welsh / Scottish / Northern Irish / British", "Irish", "Gypsy or Irish Traveller", "Any other White background"],
        "Mixed / Multiple ethnic groups": ["White and Black Caribbean", "White and Black African", "White and Asian", "Any other Mixed / Multiple ethnic background"],
        "Asian / Asian British": ["Indian", "Pakistani", "Bangladeshi", "Chinese", "Any other Asian background"],
        "Black / African / Caribbean / Black British": ["African", "Caribbean", "Any other Black / African / Caribbean background"],
        "Other ethnic group": ["Arab", "Any other ethnic group"]
    };

    const conclusionOptions = [
        "Information, Advice and Guidance Offered",
        "Introduced to Community Activity",
        "Referred to Health Colleagues",
        "Onward to Adult Social Care",
        "Referred to Housing",
        "Referred to other Council Service",
        "Invited to Return",
        "No Further Action - closed"
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/submit", formData);
            alert(response.data.message);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="container-fluid p-4">
            <div className="d-flex align-items-center justify-content-center mb-4">
    <img src="/logo.png" alt="Logo" style={{ height: "60px", marginRight: "15px" }} />
    <h2>Community Led Support Hub Attendance Data</h2>
</div>

            <form onSubmit={handleSubmit}>

                {/* HUB ATTENDANCE SECTION */}
                <div className="card p-3 mb-3">
                    <h4>Hub Attendance</h4>
                    <div className="row">
                        <div className="col-md-3">
                            <label className="form-label">Hub Attended:</label>
                            <input type="text" name="hubAttended" value={formData.hubAttended} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Date Attended:</label>
                            <input type="date" name="dateAttended" value={formData.dateAttended} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Name of Hub Worker:</label>
                            <input type="text" name="hubWorker" value={formData.hubWorker} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">How did you find out about us?</label>
                            <input type="text" name="howFound" value={formData.howFound} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                </div>

                {/* THEMES RUN ACROSS, QUESTIONS RUN DOWN */}
                <div className="row">
                    {/* WELLBEING SECTION */}
                    <div className="col-md-3">
                        <div className="card p-3 mb-3">
                            <h4>Wellbeing</h4>
                            {["coping", "connected", "control", "safe", "support", "satisfaction"].map((q) => (
                                <div key={q} className="mb-2">
                                    <label className="form-label">{q.replace(/_/g, " ")}</label>
                                    <input type="range" min="0" max="5" name={q} value={formData[q]} onChange={handleChange} className="form-range" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* EXPERIENCE SECTION */}
                    <div className="col-md-3">
                        <div className="card p-3 mb-3">
                            <h4>Experience at the Hub</h4>
                            {["venue", "welcome", "accessibility", "info", "outcome", "recommend"].map((q) => (
                                <div key={q} className="mb-2">
                                    <label className="form-label">{q.replace(/_/g, " ")}</label>
                                    <input type="range" min="0" max="5" name={q} value={formData[q]} onChange={handleChange} className="form-range" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DEMOGRAPHICS SECTION */}
<div className="col-md-3">
    <div className="card p-3 mb-3">
        <h4>Demographics</h4>

        <label className="form-label">Age Band:</label>
        <select name="ageBand" value={formData.ageBand} onChange={handleChange} className="form-select mb-2">
            <option value="">Select</option>
            {["18-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91+"].map((age) => (
                <option key={age} value={age}>{age}</option>
            ))}
        </select>

        <label className="form-label">Partial Postcode:</label>
        <input type="text" name="postcode" value={formData.postcode} onChange={handleChange} className="form-control mb-2" placeholder="e.g. AB1" />

        <label className="form-label">Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} className="form-select mb-2">
            <option value="">Select</option>
            {["Male", "Female", "Non-Binary", "Prefer Not to Say"].map((g) => (
                <option key={g} value={g}>{g}</option>
            ))}
        </select>

        <label className="form-label">Ethnicity:</label>
        <select name="ethnicity" value={formData.ethnicity} onChange={handleChange} className="form-select mb-2">
            <option value="">Select</option>
            {Object.keys(ethnicityOptions).map((ethnicity) => (
                <option key={ethnicity} value={ethnicity}>{ethnicity}</option>
            ))}
        </select>

        <label className="form-label">Specific Ethnicity:</label>
        <select name="ethnicityDetail" value={formData.ethnicityDetail} onChange={handleChange} className="form-select mb-2">
            <option value="">Select</option>
            {(ethnicityOptions[formData.ethnicity] || []).map((detail) => (
                <option key={detail} value={detail}>{detail}</option>
            ))}
        </select>
    </div>
</div>


                    {/* CONCLUSION & TEXT BOX SECTION */}
                    <div className="col-md-3">
                        <div className="card p-3 mb-3">
                            <h4>Conclusion / Next Steps</h4>
                            {["conclusion1", "conclusion2", "conclusion3"].map((c) => (
                                <select key={c} name={c} value={formData[c]} onChange={handleChange} className="form-select mb-2">
                                    <option value="">Select</option>
                                    {conclusionOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            ))}
                            <label className="form-label">Additional Notes:</label>
                            <textarea name="notes" value={formData.notes} onChange={handleChange} className="form-control" rows="6"></textarea>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-4">Submit</button>
            </form>
        </div>
    );
};

export default App;
