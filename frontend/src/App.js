import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
    const initialFormData = {
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
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState("");

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

    const dropdownOptions = [
        { value: "1", label: "1 - Not at all" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5 - Extremely" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await axios.post("http://localhost:5000/submit", formData);
            alert(response.data.message);
            handleReset();
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessage("Failed to submit. Please check your network and try again.");
        }
    };

    return (
        <div className="container-fluid p-4 text-center" style={{ maxWidth: "1600px" }}>
            {/* LOGO & TITLE */}
            <div className="d-flex align-items-center justify-content-center mb-4">
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" style={{ height: "60px", marginRight: "15px" }} />
                <h2>Community Led Support Hub Attendance Data</h2>
            </div>

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "1400px" }}>
                {/* HUB ATTENDANCE SECTION */}
                <div className="card p-3 mb-4">
                    <h4>Hub Attendance</h4>
                    <div className="row gx-4">
                        {[
                            { name: "hubAttended", label: "Hub Attended:", type: "text" },
                            { name: "dateAttended", label: "Date Attended:", type: "date" },
                            { name: "hubWorker", label: "Name of Hub Worker:", type: "text" },
                            { name: "howFound", label: "How did you find out about us?", type: "text" }
                        ].map((q) => (
                            <div key={q.name} className="col-md-3">
                                <label className="form-label">{q.label}</label>
                                <input type={q.type} name={q.name} value={formData[q.name]} onChange={handleChange} className="form-control" required />
                            </div>
                        ))}
                    </div>
                </div>

                {/* FOUR EQUAL COLUMNS */}
                <div className="row">
                    {/* WELLBEING SECTION */}
                    <div className="col-md-3">
                        <div className="card p-4 h-100">
                            <h4>Wellbeing</h4>
                            {[
                                { name: "coping", label: "How well have you been coping with daily challenges?" },
                                { name: "connected", label: "How connected do you feel to those important to you?" },
                                { name: "control", label: "How much control do you feel you have over decisions that affect your daily life?" },
                                { name: "safe", label: "How safe do you feel in your home or community?" },
                                { name: "support", label: "How easy is it for you to access the support you need to do the things you enjoy?" },
                                { name: "satisfaction", label: "Overall, how satisfied are you with your life?" }
                            ].map((q) => (
                                <div key={q.name} className="mb-3">
                                    <label className="form-label">{q.label}</label>
                                    <select name={q.name} value={formData[q.name]} onChange={handleChange} className="form-select">
                                        <option value="">Select</option>
                                        {dropdownOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* EXPERIENCE SECTION */}
                    <div className="col-md-3">
                        <div className="card p-4 h-100">
                            <h4>Experience at the Hub</h4>
                            {[
                                { name: "venue", label: "How suitable did you find the venue?" },
                                { name: "welcome", label: "Did you feel welcome?" },
                                { name: "accessibility", label: "How easy was it to get here today?" },
                                { name: "info", label: "Did you get the information, advice, or guidance you needed?" },
                                { name: "outcome", label: "Were you satisfied with the outcome of your visit?" },
                                { name: "recommend", label: "Would you recommend this hub to someone in a similar position?" }
                            ].map((q) => (
                                <div key={q.name} className="mb-3">
                                    <label className="form-label">{q.label}</label>
                                    <select name={q.name} value={formData[q.name]} onChange={handleChange} className="form-select">
                                        <option value="">Select</option>
                                        {dropdownOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DEMOGRAPHICS SECTION (FULLY RESTORED & VERIFIED) */}
                    <div className="col-md-3">
                        <div className="card p-3 h-100">
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
                                {["White", "Mixed / Multiple ethnic groups", "Asian / Asian British", "Black / African / Caribbean / Black British", "Other ethnic group"].map((ethnicity) => (
                                    <option key={ethnicity} value={ethnicity}>{ethnicity}</option>
                                ))}
                            </select>

                            {formData.ethnicity && (
                                <>
                                    <label className="form-label">Specific Ethnicity:</label>
                                    <select name="ethnicityDetail" value={formData.ethnicityDetail} onChange={handleChange} className="form-select mb-2">
                                        <option value="">Select</option>
                                        {(formData.ethnicity === "White" ? ["English / Welsh / Scottish / Northern Irish / British", "Irish", "Gypsy or Irish Traveller", "Any other White background"]
                                            : formData.ethnicity === "Mixed / Multiple ethnic groups" ? ["White and Black Caribbean", "White and Black African", "White and Asian", "Any other Mixed / Multiple ethnic background"]
                                            : formData.ethnicity === "Asian / Asian British" ? ["Indian", "Pakistani", "Bangladeshi", "Chinese", "Any other Asian background"]
                                            : formData.ethnicity === "Black / African / Caribbean / Black British" ? ["African", "Caribbean", "Any other Black / African / Caribbean background"]
                                            : formData.ethnicity === "Other ethnic group" ? ["Arab", "Any other ethnic group"]
                                            : []).map((detail) => (
                                            <option key={detail} value={detail}>{detail}</option>
                                        ))}
                                    </select>
                                </>
                            )}
                        </div>
                    </div>

                    {/* CONCLUSION / NEXT STEPS SECTION (FULLY RESTORED & VERIFIED) */}
                    <div className="col-md-3">
                        <div className="card p-3 h-100">
                            <h4>Conclusion / Next Steps</h4>

                            {["conclusion1", "conclusion2", "conclusion3"].map((c) => (
    <div key={c} className="mb-3">
        <label className="form-label">Next Step:</label>
        <select name={c} value={formData[c]} onChange={handleChange} className="form-select">
            <option value="">Select</option>
            {conclusionOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
))}

                            <label className="form-label">Additional Notes:</label>
                            <textarea name="notes" value={formData.notes} onChange={handleChange} className="form-control" rows="16"></textarea>
                        </div>
                    </div>
                </div>
                {/* BUTTONS */}
                <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-secondary" onClick={handleReset}>Clear Form</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default App;
