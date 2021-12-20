import axios from "axios";

import React, { Component } from "react";

class App extends Component {
  handleChange = this.handleChange.bind(this);
  state = {
    // Initially, no file is selected
    selectedFile: null,
    userInfo: {
      status: false,
      firstName: null,
      lastName: null,
      stateRegNumber: null,
    },
    fileUploadStatus: true,
    emailAddress: "",
  };

  handleChange(event) {
    this.setState({ emailAddress: event.target.value });
  }

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    this.setState({ fileUploadStatus: false });
    
  };
  saveInfo = ()=>{
    
    console.log(this.state.userInfo);
    console.log(this.state.emailAddress);
  }
  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(this.state.selectedFile, this.state.selectedFile.name);
    
    // Request made to the backend api
    // Send formData object
    // const userData = axios.post("api/uploadfile", formData);
    const userData = {
      status: true,
      firstName: "Одбаяр",
      lastName: "Буян-Өлзий",
      stateRegNumber: "ЕЮ94031213",
    };

    this.setState({
      userInfo: {
        status: userData.status,
        firstName: userData.firstName,
        lastName: userData.lastName,
        stateRegNumber: userData.stateRegNumber,
      },
    });
  };

  // File content to be displayed after
  // file upload is complete
  userInfo = () => {
    if (this.state.userInfo.status) {
      return (
        <div>
          <h3>Иргэний үнэмлэхний мэдээлэл</h3>
          <label>Эцэг/эх-ийн нэр: </label>
          <input
            type="text"
            name="lastName"
            disabled="true"
            value={this.state.userInfo.lastName}
          />

          <label>Өөрийн нэр: </label>
          <input
            type="text"
            name="lastName"
            disabled="true"
            value={this.state.userInfo.firstName}
          />
          <label>Регистрийн дугаар: </label>
          <input
            type="text"
            name="stateRegNumber"
            disabled="true"
            value={this.state.userInfo.stateRegNumber}
          />
          <label>Имэйл хаяг</label>
          <input
            type="text"
            placeholder="Имэйл хаягаа оруулна уу"
            value={this.state.emailAddress}
            onChange={this.handleChange}
          />
          <button onClick={this.saveInfo}>Бүртгүүлэх</button>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  render() {
    return (
      <div>
        <h3>Иргэний үнэмлэхээ барьсан өөрөг зургаа оруулна уу</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button disabled={this.state.fileUploadStatus} onClick={this.onFileUpload}>Зураг илгээх</button>
        </div>
        {this.userInfo()}
      </div>
    );
  }
}

export default App;
