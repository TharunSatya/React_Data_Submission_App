import React, { useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Addschemapopup.css";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const Addschemapopup = ({ setShowPopup }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");

  // added schemas are the selected list of sch
  const [addedSchemas, setAddedSchemas] = useState([]);
  // new selected schemaArray to send the data to server in required format
  const [newSelectedSchemasArray, setNewSelectedSchemasArray] = useState([]);
  // status message to now the status after performing action
  const [statusMessage, setStatusMessage] = useState("");

  //available dropdown by default
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);

  //handleSubmitData function to post the data to server
  const handleSubmitData = async () => {
    if (segmentName !== "" && newSelectedSchemasArray.length !== 0) {
      setSegmentName("");
      setStatusMessage("Data submitted succesfully");
      setAddedSchemas([]);
      const transformedData = newSelectedSchemasArray.map((item) => {
        return {
          [item.value]: item.label,
        };
      });

      const data = {
        schema: transformedData,
        segment_name: segmentName,
      };

      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          data
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error occured while posting data:", error);
      }
    } else if (newSelectedSchemasArray.length === 0) {
      setStatusMessage("Please select the schemas");
    } else {
      setStatusMessage("Please Enter the Segment Name");
    }

    setAvailableSchemas([
      { label: "First Name", value: "first_name" },
      { label: "Last Name", value: "last_name" },
      { label: "Gender", value: "gender" },
      { label: "Age", value: "age" },
      { label: "Account Name", value: "account_name" },
      { label: "City", value: "city" },
      { label: "State", value: "state" },
    ]);
  };

  //function to add selectedSchema to the array
  const handleAddNewSchema = () => {
    if (selectedSchema) {
      setAddedSchemas([...addedSchemas, selectedSchema]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== selectedSchema)
      );

      setNewSelectedSchemasArray(
        availableSchemas.filter((schema) => schema.value !== selectedSchema)
      );

      setSelectedSchema("");
    }
  };
  //function to setSelected schema to the state
  const handleSchemaChange = (event) => {
    setSelectedSchema(event.target.value);
  };

  //function to set segment name
  const handleSegmentNameChange = (event) => {
    setSegmentName(event.target.value);
  };

  //function to reset the all states to initial state
  const handleCancel = () => {
    setAddedSchemas([]);
    setAvailableSchemas([
      { label: "First Name", value: "first_name" },
      { label: "Last Name", value: "last_name" },
      { label: "Gender", value: "gender" },
      { label: "Age", value: "age" },
      { label: "Account Name", value: "account_name" },
      { label: "City", value: "city" },
      { label: "State", value: "state" },
    ]);
    setShowPopup(false);
  };

  const handleDelete = (schema) => {
    // Create a new array excluding the removed item
    const updatedSchemas = addedSchemas.filter(
      (eachItem) => eachItem !== schema
    );

    // Update the added schemas state
    setAddedSchemas(updatedSchemas);
  };
  return (
    <div className="popup-container">
      <nav className="nav-segment">
        <p>
          {" "}
          <MdOutlineKeyboardArrowLeft
            className="arrow-icon"
            onClick={handleCancel}
          />
          Saving Segment
        </p>
      </nav>
      <main>
        <label htmlFor="title">Enter Name of the segment</label>
        <input
          height={100}
          width={100}
          className="segment-name-input"
          id="title"
          type="text"
          placeholder="Name of the segment"
          value={segmentName}
          onChange={handleSegmentNameChange}
        />
        <p>
          To Save your segment, you need to add the schemas to build the query
        </p>

        {/* displaying selected schemas after selecting from the dropdown */}
        {addedSchemas.map((schema, index) => (
          <div key={schema} className="schema-container">
            <select
              className="selected-schemas"
              key={schema}
              value={schema}
              disabled
            >
              <option className="options-value">{schema}</option>
            </select>
            <button className="delete-btn" onClick={() => handleDelete(schema)}>
              <i className="bi bi-dash"></i>
            </button>
          </div>
        ))}

        <select
          className="dropdown"
          value={selectedSchema}
          onChange={handleSchemaChange}
        >
          <option value="">Add Schema to segment</option>
          {availableSchemas.map((schema) => (
            <option key={schema.value} value={schema.value}>
              {schema.label}
            </option>
          ))}
        </select>
        <a href="!#" onClick={handleAddNewSchema}>
          + Add new schema
        </a>
        <p className="status-msg">{statusMessage}</p>
      </main>
      <footer className="footer">
        <button className="save-the-segment-btn" onClick={handleSubmitData}>
          Save the Segment
        </button>
        <button className="clear-btn" onClick={handleCancel}>
          Cancel
        </button>
      </footer>
    </div>
  );
};

export default Addschemapopup;
