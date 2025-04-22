import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeName,
  getSession,
  changeEmail,
  changePassword,
  logout,
} from "../appwrite/User";
import Alert from "../components/Alert";
import { useNavigate } from "react-router";
import { logOut as reduxLogout } from "../redux/authSlice";
export default function Account() {
  const userData = useSelector((state) => state.authSlice?.userData);
  const [sessions, setsession] = useState(null);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [updateName, setUpdateName] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [changeoldpassword, setChangeOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getLogOut = async () => {
    await logout();
    dispatch(reduxLogout());
    navigate("/");
  };

  useEffect(() => {
    const listSession = async () => {
      const session = await getSession();
      setsession(session.sessions[0]);
    };
    listSession();
  }, []);
  const submitName = async () => {

    const data = await changeName(name);
    if (data) {
      setAlert(true);
      setAlertMessage("Successfully Updated Name");
      setName("");
    } else {
      setAlert(true);
      setAlertMessage("Error in Updating Name");
    }
  };
  const submitEmail = async () => {
    const data = await changeEmail(email, oldpassword);
    if (data) {
      setAlert(true);
      setAlertMessage("Successfully Updated email");
      setEmail("");
      setOldPassword("");
    } else {
      setAlert(true);
      setAlertMessage("Error in Updating Email");
    }
  };
  const submitPassword = async () => {
    const data = await changePassword(password, changeoldpassword);
    if (data) {
      setAlert(true);
      setAlertMessage("Successfully Updated password");
      setChangeOldPassword("");
      setPassword("");
    } else {
      setAlert(true);
      setAlertMessage("Error in Updating Password");
    }
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto px-6 space-y-8">
      {alert && <Alert message={alertMessage} setAlert={setAlert} />}
      <div className="rounded-xl p-6 bg-primaryBg text-white space-y-4 shadow-lg border border-opacity-20 border-blue-300">
        <h1 className="text-2xl font-bold flex items-center">
          <span className="mr-2">👋</span> Hello, {userData?.name}!
        </h1>

        {!updateName ? (
          <button
            onClick={() => setUpdateName(true)}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Update Name
          </button>
        ) : (
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new name"
              className="p-2 rounded bg-secondaryBg text-white w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="flex gap-2">
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors duration-200 font-medium"
                onClick={() => submitName()}
              >
                Update
              </button>
              <button
                onClick={() => setUpdateName(false)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl p-6 text-white space-y-4 shadow-lg bg-opacity-20 bg-blue-900 backdrop-blur-sm border border-opacity-20 border-blue-300">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Email
          </h2>
          <p className="text-gray-300 truncate">{userData?.email}</p>

          {!updateEmail ? (
            <button
              onClick={() => setUpdateEmail(true)}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Update Email
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter new email"
                className="p-2 rounded bg-secondaryBg text-white w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="password"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your Password"
                className="p-2 rounded bg-secondaryBg text-white w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors duration-200 flex-1 font-medium"
                  onClick={() => submitEmail()}
                >
                  Update
                </button>
                <button
                  onClick={() => setUpdateEmail(false)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors duration-200 flex-1 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl p-6 text-white space-y-4 shadow-lg bg-opacity-20 bg-blue-900 backdrop-blur-sm border border-opacity-20 border-blue-300">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Password
          </h2>
          <p className="text-gray-300">••••••••••••</p>

          {!updatePassword ? (
            <button
              onClick={() => setUpdatePassword(true)}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Update Password
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="p-2 rounded bg-secondaryBg text-white w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="password"
                value={changeoldpassword}
                onChange={(e) => setChangeOldPassword(e.target.value)}
                placeholder="Enter new password"
                className="p-2 rounded bg-secondaryBg text-white w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors duration-200 flex-1 font-medium"
                  onClick={() => submitPassword()}
                >
                  Update
                </button>
                <button
                  onClick={() => setUpdatePassword(false)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors duration-200 flex-1 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl p-6 text-white shadow-lg bg-opacity-20 bg-blue-900 backdrop-blur-sm border border-opacity-20 border-blue-300">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Session Details
        </h2>

        {sessions ? (
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
            <div className="flex items-start">
              <span className="font-medium min-w-16 text-gray-300">
                Client:
              </span>
              <span className="ml-2">{sessions?.clientName}</span>
            </div>
            <div className="flex items-start  overflow-clip">
              <span className="font-medium min-w-16 text-gray-300">IP:</span>
              <span className="ml-2">{sessions?.ip}</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium min-w-16 text-gray-300">OS:</span>
              <span className="ml-2">{sessions?.osName}</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium min-w-16 text-gray-300">
                User ID:
              </span>
              <span className="ml-2 truncate">{sessions?.userId}</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium min-w-16 text-gray-300">
                Created:
              </span>
              <span className="ml-2">
                {new Date(sessions?.$createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="flex items-start">
              <span className="font-medium min-w-16 text-gray-300">
                Updated:
              </span>
              <span className="ml-2">
                {new Date(sessions?.$updatedAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="md:col-span-2 flex items-start">
              <span className="font-medium min-w-16 text-gray-300">
                Expires:
              </span>
              <span className="ml-2">
                {new Date(sessions?.expire).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3">Loading session info...</span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
        <button
          className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded-lg text-white w-full transition-colors duration-200 font-medium flex items-center justify-center gap-2"
          onClick={() => getLogOut()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}
