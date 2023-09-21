import { toast } from "react-toastify";

const error = (message: string) => {
    toast(message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        style: {
            fontFamily: "Roboto",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "400",
            margin: "5.5px 0px 0px 5px",
        },
        progressStyle: { backgroundColor: "red" },
    });
};

const notify = (message: string) => {
    toast(message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        style: {
            fontFamily: "Roboto",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "400",
            margin: "5.5px 0px 0px 5px",
        },
        progressStyle: { backgroundColor: "white" },
    });
};

export { error, notify };
