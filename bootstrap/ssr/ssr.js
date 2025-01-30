import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { forwardRef, useRef, useImperativeHandle, useEffect, createContext, useState, useContext, useCallback } from "react";
import { Link, useForm, Head, usePage, router, createInertiaApp } from "@inertiajs/react";
import { useEventListener, useMountEffect, useUnmountEffect } from "primereact/hooks/hooks.esm.js";
import { classNames } from "primereact/utils/utils.esm.js";
import { Ripple } from "primereact/ripple/ripple.esm.js";
import { CSSTransition } from "react-transition-group";
import { PrimeReactContext } from "primereact/api/api.esm.js";
// import { Button } from "primereact/button/button.esm.js";
import * as pkg from "primereact/button/button.esm.js";
const { Button } = pkg;

import { InputSwitch } from "primereact/inputswitch/inputswitch.esm.js";
import { RadioButton } from "primereact/radiobutton/radiobutton.esm.js";
import { Sidebar } from "primereact/sidebar/sidebar.esm.js";
import Select from "react-select";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import axios$1 from "axios";
import debounce from "lodash/debounce.js";
import { InputText } from "primereact/inputtext/inputtext.esm.js";
import { Transition, Dialog, TransitionChild, DialogPanel, Button as Button$1 } from "@headlessui/react";
import toast from "react-hot-toast";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
function InputError({ message, className = "", ...props }) {
    return message ? /* @__PURE__ */ jsx(
        "p",
        {
            ...props,
            className: "text-sm text-red-600 " + className,
            children: message
        }
    ) : null;
}
function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return /* @__PURE__ */ jsx(
        "label",
        {
            ...props,
            className: `block text-sm font-medium text-gray-700 ` + className,
            children: value ? value : children
        }
    );
}
function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return /* @__PURE__ */ jsx(
        "button",
        {
            ...props,
            className: `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${disabled && "opacity-25"} ` + className,
            disabled,
            children
        }
    );
}
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, ...props }, ref) {
    const localRef = useRef(null);
    useImperativeHandle(ref, () => ({
        focus: () => {
            var _a;
            return (_a = localRef.current) == null ? void 0 : _a.focus();
        }
    }));
    useEffect(() => {
        var _a;
        if (isFocused) {
            (_a = localRef.current) == null ? void 0 : _a.focus();
        }
    }, [isFocused]);
    return /* @__PURE__ */ jsx(
        "input",
        {
            ...props,
            type,
            className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " + className,
            ref: localRef
        }
    );
});
function ApplicationLogo(props) {
    return /* @__PURE__ */ jsx(
        "svg",
        {
            ...props,
            viewBox: "0 0 316 316",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx("path", { d: "M305.8 81.125C305.77 80.995 305.69 80.885 305.65 80.755C305.56 80.525 305.49 80.285 305.37 80.075C305.29 79.935 305.17 79.815 305.07 79.685C304.94 79.515 304.83 79.325 304.68 79.175C304.55 79.045 304.39 78.955 304.25 78.845C304.09 78.715 303.95 78.575 303.77 78.475L251.32 48.275C249.97 47.495 248.31 47.495 246.96 48.275L194.51 78.475C194.33 78.575 194.19 78.725 194.03 78.845C193.89 78.955 193.73 79.045 193.6 79.175C193.45 79.325 193.34 79.515 193.21 79.685C193.11 79.815 192.99 79.935 192.91 80.075C192.79 80.285 192.71 80.525 192.63 80.755C192.58 80.875 192.51 80.995 192.48 81.125C192.38 81.495 192.33 81.875 192.33 82.265V139.625L148.62 164.795V52.575C148.62 52.185 148.57 51.805 148.47 51.435C148.44 51.305 148.36 51.195 148.32 51.065C148.23 50.835 148.16 50.595 148.04 50.385C147.96 50.245 147.84 50.125 147.74 49.995C147.61 49.825 147.5 49.635 147.35 49.485C147.22 49.355 147.06 49.265 146.92 49.155C146.76 49.025 146.62 48.885 146.44 48.785L93.99 18.585C92.64 17.805 90.98 17.805 89.63 18.585L37.18 48.785C37 48.885 36.86 49.035 36.7 49.155C36.56 49.265 36.4 49.355 36.27 49.485C36.12 49.635 36.01 49.825 35.88 49.995C35.78 50.125 35.66 50.245 35.58 50.385C35.46 50.595 35.38 50.835 35.3 51.065C35.25 51.185 35.18 51.305 35.15 51.435C35.05 51.805 35 52.185 35 52.575V232.235C35 233.795 35.84 235.245 37.19 236.025L142.1 296.425C142.33 296.555 142.58 296.635 142.82 296.725C142.93 296.765 143.04 296.835 143.16 296.865C143.53 296.965 143.9 297.015 144.28 297.015C144.66 297.015 145.03 296.965 145.4 296.865C145.5 296.835 145.59 296.775 145.69 296.745C145.95 296.655 146.21 296.565 146.45 296.435L251.36 236.035C252.72 235.255 253.55 233.815 253.55 232.245V174.885L303.81 145.945C305.17 145.165 306 143.725 306 142.155V82.265C305.95 81.875 305.89 81.495 305.8 81.125ZM144.2 227.205L100.57 202.515L146.39 176.135L196.66 147.195L240.33 172.335L208.29 190.625L144.2 227.205ZM244.75 114.995V164.795L226.39 154.225L201.03 139.625V89.825L219.39 100.395L244.75 114.995ZM249.12 57.105L292.81 82.265L249.12 107.425L205.43 82.265L249.12 57.105ZM114.49 184.425L96.13 194.995V85.305L121.49 70.705L139.85 60.135V169.815L114.49 184.425ZM91.76 27.425L135.45 52.585L91.76 77.745L48.07 52.585L91.76 27.425ZM43.67 60.135L62.03 70.705L87.39 85.305V202.545V202.555V202.565C87.39 202.735 87.44 202.895 87.46 203.055C87.49 203.265 87.49 203.485 87.55 203.695V203.705C87.6 203.875 87.69 204.035 87.76 204.195C87.84 204.375 87.89 204.575 87.99 204.745C87.99 204.745 87.99 204.755 88 204.755C88.09 204.905 88.22 205.035 88.33 205.175C88.45 205.335 88.55 205.495 88.69 205.635L88.7 205.645C88.82 205.765 88.98 205.855 89.12 205.965C89.28 206.085 89.42 206.225 89.59 206.325C89.6 206.325 89.6 206.325 89.61 206.335C89.62 206.335 89.62 206.345 89.63 206.345L139.87 234.775V285.065L43.67 229.705V60.135ZM244.75 229.705L148.58 285.075V234.775L219.8 194.115L244.75 179.875V229.705ZM297.2 139.625L253.49 164.795V114.995L278.85 100.395L297.21 89.825V139.625H297.2Z" })
        }
    );
}
function GuestLayout({ children }) {
    return /* @__PURE__ */ jsxs("div", {
        className: "flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "h-20 w-20 fill-current text-gray-500" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg", children })
        ]
    });
}
function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: ""
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onFinish: () => reset("password")
        });
    };
    return /* @__PURE__ */ jsxs(GuestLayout, {
        children: [
    /* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "This is a secure area of the application. Please confirm your password before continuing." }),
    /* @__PURE__ */ jsxs("form", {
            onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", {
                className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "password",
                        type: "password",
                        name: "password",
                        value: data.password,
                        className: "mt-1 block w-full",
                        isFocused: true,
                        onChange: (e) => setData("password", e.target.value)
                    }
                ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
                ]
            }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Confirm" }) })
            ]
        })
        ]
    });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: ""
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };
    return /* @__PURE__ */ jsxs(GuestLayout, {
        children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." }),
            status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", {
                onSubmit: submit, children: [
      /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "email",
                        type: "email",
                        name: "email",
                        value: data.email,
                        className: "mt-1 block w-full",
                        isFocused: true,
                        onChange: (e) => setData("email", e.target.value)
                    }
                ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Email Password Reset Link" }) })
                ]
            })
        ]
    });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({ className = "", ...props }) {
    return /* @__PURE__ */ jsx(
        "input",
        {
            ...props,
            type: "checkbox",
            className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
        }
    );
}
function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password")
        });
    };
    return /* @__PURE__ */ jsxs(GuestLayout, {
        children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
            status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", {
                onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", {
                    children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
                        TextInput,
                        {
                            id: "email",
                            type: "email",
                            name: "email",
                            value: data.email,
                            className: "mt-1 block w-full",
                            autoComplete: "username",
                            isFocused: true,
                            onChange: (e) => setData("email", e.target.value)
                        }
                    ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
                    ]
                }),
      /* @__PURE__ */ jsxs("div", {
                    className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
                        TextInput,
                        {
                            id: "password",
                            type: "password",
                            name: "password",
                            value: data.password,
                            className: "mt-1 block w-full",
                            autoComplete: "current-password",
                            onChange: (e) => setData("password", e.target.value)
                        }
                    ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
                    ]
                }),
      /* @__PURE__ */ jsx("div", {
                    className: "mt-4 block", children: /* @__PURE__ */ jsxs("label", {
                        className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
                            Checkbox,
                            {
                                name: "remember",
                                checked: data.remember,
                                onChange: (e) => setData("remember", e.target.checked)
                            }
                        ),
        /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-gray-600", children: "Remember me" })
                        ]
                    })
                }),
      /* @__PURE__ */ jsxs("div", {
                    className: "mt-4 flex items-center justify-end", children: [
                        canResetPassword && /* @__PURE__ */ jsx(
                            Link,
                            {
                                href: route("password.request"),
                                className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                                children: "Forgot your password?"
                            }
                        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Log in" })
                    ]
                })
                ]
            })
        ]
    });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Login
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation")
        });
    };
    return /* @__PURE__ */ jsxs(GuestLayout, {
        children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsxs("form", {
            onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", {
                children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "name",
                        name: "name",
                        value: data.name,
                        className: "mt-1 block w-full",
                        autoComplete: "name",
                        isFocused: true,
                        onChange: (e) => setData("name", e.target.value),
                        required: true
                    }
                ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "email",
                        type: "email",
                        name: "email",
                        value: data.email,
                        className: "mt-1 block w-full",
                        autoComplete: "username",
                        onChange: (e) => setData("email", e.target.value),
                        required: true
                    }
                ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "password",
                        type: "password",
                        name: "password",
                        value: data.password,
                        className: "mt-1 block w-full",
                        autoComplete: "new-password",
                        onChange: (e) => setData("password", e.target.value),
                        required: true
                    }
                ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                className: "mt-4", children: [
        /* @__PURE__ */ jsx(
                    InputLabel,
                    {
                        htmlFor: "password_confirmation",
                        value: "Confirm Password"
                    }
                ),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "password_confirmation",
                        type: "password",
                        name: "password_confirmation",
                        value: data.password_confirmation,
                        className: "mt-1 block w-full",
                        autoComplete: "new-password",
                        onChange: (e) => setData("password_confirmation", e.target.value),
                        required: true
                    }
                ),
        /* @__PURE__ */ jsx(
                    InputError,
                    {
                        message: errors.password_confirmation,
                        className: "mt-2"
                    }
                )
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                className: "mt-4 flex items-center justify-end", children: [
        /* @__PURE__ */ jsx(
                    Link,
                    {
                        href: route("login"),
                        className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                        children: "Already registered?"
                    }
                ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Register" })
                ]
            })
            ]
        })
        ]
    });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: "",
        password_confirmation: ""
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation")
        });
    };
    return /* @__PURE__ */ jsxs(GuestLayout, {
        children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
    /* @__PURE__ */ jsxs("form", {
            onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", {
                children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "email",
                        type: "email",
                        name: "email",
                        value: data.email,
                        className: "mt-1 block w-full",
                        autoComplete: "username",
                        onChange: (e) => setData("email", e.target.value)
                    }
                ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "password",
                        type: "password",
                        name: "password",
                        value: data.password,
                        className: "mt-1 block w-full",
                        autoComplete: "new-password",
                        isFocused: true,
                        onChange: (e) => setData("password", e.target.value)
                    }
                ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                className: "mt-4", children: [
        /* @__PURE__ */ jsx(
                    InputLabel,
                    {
                        htmlFor: "password_confirmation",
                        value: "Confirm Password"
                    }
                ),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        type: "password",
                        id: "password_confirmation",
                        name: "password_confirmation",
                        value: data.password_confirmation,
                        className: "mt-1 block w-full",
                        autoComplete: "new-password",
                        onChange: (e) => setData("password_confirmation", e.target.value)
                    }
                ),
        /* @__PURE__ */ jsx(
                    InputError,
                    {
                        message: errors.password_confirmation,
                        className: "mt-2"
                    }
                )
                ]
            }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Reset Password" }) })
            ]
        })
        ]
    });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail({ status }) {
    const { post, processing } = useForm({});
    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };
    return /* @__PURE__ */ jsxs(GuestLayout, {
        children: [
    /* @__PURE__ */ jsx(Head, { title: "Email Verification" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another." }),
            status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsx("form", {
                onSubmit: submit, children: /* @__PURE__ */ jsxs("div", {
                    className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Resend Verification Email" }),
      /* @__PURE__ */ jsx(
                        Link,
                        {
                            href: route("logout"),
                            method: "post",
                            as: "button",
                            className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                            children: "Log Out"
                        }
                    )
                    ]
                })
            })
        ]
    });
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
const AppFooter = () => {
    return /* @__PURE__ */ jsxs("div", {
        className: "layout-footer", children: [
    /* @__PURE__ */ jsxs("span", {
            children: [
                "Made with ",
      /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "❤️" }),
                " by"
            ]
        }),
    /* @__PURE__ */ jsx("span", { className: "ml-2 font-medium", children: /* @__PURE__ */ jsx("a", { href: "https://neotronicdev.com", children: "Muhammad waleed Khan" }) })
        ]
    });
};
const MenuContext = createContext({});
const MenuProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState("");
    const value = {
        activeMenu,
        setActiveMenu
    };
    return /* @__PURE__ */ jsx(MenuContext.Provider, { value, children });
};
const AppMenuitem = (props) => {
    const pathname = route(route().current());
    const searchParams = "";
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const item = props.item;
    const key = props.parentKey ? props.parentKey + "-" + props.index : String(props.index);
    const isActiveRoute = item.to && pathname === item.to;
    const active = activeMenu === key || activeMenu.startsWith(key + "-");
    const onRouteChange = (url) => {
        if (item.to && item.to === url) {
            setActiveMenu(key);
        }
    };
    useEffect(() => {
        onRouteChange(pathname);
    }, [pathname, searchParams]);
    const itemClick = (event) => {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (item.command) {
            item.command({ originalEvent: event, item });
        }
        if (item.items) setActiveMenu(active ? props.parentKey : key);
        else setActiveMenu(key);
    };
    const subMenu = item.items && item.visible !== false && /* @__PURE__ */ jsx(CSSTransition, {
        timeout: { enter: 1e3, exit: 450 }, classNames: "layout-submenu", in: props.root ? true : active, children: /* @__PURE__ */ jsx("ul", {
            children: item.items.map((child, i) => {
                return /* @__PURE__ */ jsx(AppMenuitem, { item: child, index: i, className: child.badgeClass, parentKey: key }, child.label);
            })
        })
    }, item.label);
    return /* @__PURE__ */ jsxs("li", {
        className: classNames({ "layout-root-menuitem": props.root, "active-menuitem": active }), children: [
            props.root && item.visible !== false && /* @__PURE__ */ jsx("div", { className: "layout-menuitem-root-text", children: item.label }),
            (!item.to || item.items) && item.visible !== false ? /* @__PURE__ */ jsxs("a", {
                href: item.url, onClick: (e) => itemClick(e), className: classNames(item.class, "p-ripple"), target: item.target, tabIndex: 0, children: [
      /* @__PURE__ */ jsx("i", { className: classNames("layout-menuitem-icon", item.icon) }),
      /* @__PURE__ */ jsx("span", { className: "layout-menuitem-text", children: item.label }),
                    item.items && /* @__PURE__ */ jsx("i", { className: "pi pi-fw pi-angle-down layout-submenu-toggler" }),
      /* @__PURE__ */ jsx(Ripple, {})
                ]
            }) : null,
            item.to && !item.items && item.visible !== false ? /* @__PURE__ */ jsxs(Link, {
                href: item.to, replace: item.replaceUrl, target: item.target, onClick: (e) => itemClick(e), className: classNames(item.class, "p-ripple", { "active-route": isActiveRoute }), tabIndex: 0, children: [
      /* @__PURE__ */ jsx("i", { className: classNames("layout-menuitem-icon", item.icon) }),
      /* @__PURE__ */ jsx("span", { className: "layout-menuitem-text", children: item.label }),
                    item.items && /* @__PURE__ */ jsx("i", { className: "pi pi-fw pi-angle-down layout-submenu-toggler" }),
      /* @__PURE__ */ jsx(Ripple, {})
                ]
            }) : null,
            subMenu
        ]
    });
};
const LayoutContext = createContext({});
const AppMenu = () => {
    useContext(LayoutContext);
    const model = [
        {
            label: "Home",
            items: [
                { label: "Dashboard", icon: "pi pi-fw pi-home", to: route("dashboard") },
                { label: "Users", icon: "pi pi-fw pi-id-card", to: route("users.index") },
                { label: "Tasks", icon: "pi pi-fw pi-id-card", to: route("tasks.index") },
                { label: "Projects", icon: "pi pi-fw pi-id-card", to: route("projects.index") },
                { label: "Chat", icon: "pi pi-fw pi-id-card", to: route("chat.index") }
            ]
        }
    ];
    return /* @__PURE__ */ jsx(MenuProvider, {
        children: /* @__PURE__ */ jsx("ul", {
            className: "layout-menu", children: model.map((item, i) => {
                return !(item == null ? void 0 : item.seperator) ? /* @__PURE__ */ jsx(AppMenuitem, { item, root: true, index: i }, item.label) : /* @__PURE__ */ jsx("li", { className: "menu-separator" });
            })
        })
    });
};
const AppSidebar = () => {
    return /* @__PURE__ */ jsx(AppMenu, {});
};
const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));
    return /* @__PURE__ */ jsxs("div", {
        className: "layout-topbar", children: [
    /* @__PURE__ */ jsx(Link, { href: "/", className: "layout-topbar-logo", children: /* @__PURE__ */ jsx("img", { src: `/images/logo/-${layoutConfig.colorScheme !== "light" ? "white" : "dark"}.svg`, width: "100.22px", height: "35px", alt: "logo" }) }),
    /* @__PURE__ */ jsx("button", { ref: menubuttonRef, type: "button", className: "p-link layout-menu-button layout-topbar-button", onClick: onMenuToggle, children: /* @__PURE__ */ jsx("i", { className: "pi pi-bars" }) }),
    /* @__PURE__ */ jsx("button", { ref: topbarmenubuttonRef, type: "button", className: "p-link layout-topbar-menu-button layout-topbar-button", onClick: showProfileSidebar, children: /* @__PURE__ */ jsx("i", { className: "pi pi-user" }) }),
    /* @__PURE__ */ jsxs("div", {
            ref: topbarmenuRef, className: classNames("layout-topbar-menu", { "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible }), children: [
      /* @__PURE__ */ jsxs(Link, {
                href: route("profile.edit"), className: "p-link layout-topbar-button", children: [
        /* @__PURE__ */ jsx("i", { className: "pi pi-user" }),
        /* @__PURE__ */ jsx("span", { children: "Profile" })
                ]
            }),
      /* @__PURE__ */ jsxs(Link, {
                href: route("logout"), method: "post", as: "button", className: "p-link layout-topbar-button", children: [
        /* @__PURE__ */ jsx("i", { className: "pi pi-lock" }),
        /* @__PURE__ */ jsx("span", { children: "Logout" })
                ]
            })
            ]
        })
        ]
    });
});
AppTopbar.displayName = "AppTopbar";
function AppConfigButton({ onClick, img, imgAlt }) {
    return /* @__PURE__ */ jsx("div", {
        className: "col-3", children: /* @__PURE__ */ jsx("button", {
            className: "p-link w-2rem h-2rem", onClick, children: /* @__PURE__ */ jsx(
                "img",
                {
                    src: img,
                    className: "w-2rem h-2rem",
                    alt: imgAlt
                }
            )
        })
    });
}
const AppConfig = (props) => {
    const [scales] = useState([12, 13, 14, 15, 16]);
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const { setRipple, changeTheme } = useContext(PrimeReactContext);
    const onConfigButtonClick = () => {
        setLayoutState((prevState) => ({ ...prevState, configSidebarVisible: true }));
    };
    const onConfigSidebarHide = () => {
        setLayoutState((prevState) => ({ ...prevState, configSidebarVisible: false }));
    };
    const changeInputStyle = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, inputStyle: e.value }));
    };
    const changeRipple = (e) => {
        setRipple(e.value);
        setLayoutConfig((prevState) => ({ ...prevState, ripple: e.value }));
    };
    const changeMenuMode = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, menuMode: e.value }));
    };
    const _changeTheme = (theme, colorScheme) => {
        changeTheme == null ? void 0 : changeTheme(layoutConfig.theme, theme, "theme-css", () => {
            setLayoutConfig((prevState) => ({ ...prevState, theme, colorScheme }));
        });
    };
    const decrementScale = () => {
        setLayoutConfig((prevState) => ({ ...prevState, scale: prevState.scale - 1 }));
    };
    const incrementScale = () => {
        setLayoutConfig((prevState) => ({ ...prevState, scale: prevState.scale + 1 }));
    };
    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + "px";
    };
    useEffect(() => {
        applyScale();
    }, [layoutConfig.scale]);
    return /* @__PURE__ */ jsxs(Fragment, {
        children: [
    /* @__PURE__ */ jsx("button", { className: "layout-config-button config-link", type: "button", onClick: onConfigButtonClick, children: /* @__PURE__ */ jsx("i", { className: "pi pi-cog" }) }),
    /* @__PURE__ */ jsxs(
            Sidebar,
            {
                visible: layoutState.configSidebarVisible,
                onHide: onConfigSidebarHide,
                position: "right",
                className: "layout-config-sidebar w-20rem",
                children: [
                    !props.simple && /* @__PURE__ */ jsxs(Fragment, {
                        children: [
            /* @__PURE__ */ jsx("h5", { children: "Scale" }),
            /* @__PURE__ */ jsxs("div", {
                            className: "flex align-items-center", children: [
              /* @__PURE__ */ jsx(
                                Button,
                                {
                                    icon: "pi pi-minus",
                                    type: "button",
                                    onClick: decrementScale,
                                    rounded: true,
                                    text: true,
                                    className: "mr-2 w-2rem h-2rem",
                                    disabled: layoutConfig.scale === scales[0]
                                }
                            ),
              /* @__PURE__ */ jsx("div", {
                                className: "flex gap-2 align-items-center", children: scales.map((item) => {
                                    return /* @__PURE__ */ jsx("i", {
                                        className: classNames("pi pi-circle-fill", {
                                            "text-primary-500": item === layoutConfig.scale,
                                            "text-300": item !== layoutConfig.scale
                                        })
                                    }, item);
                                })
                            }),
              /* @__PURE__ */ jsx(
                                Button,
                                {
                                    icon: "pi pi-plus",
                                    type: "button",
                                    onClick: incrementScale,
                                    rounded: true,
                                    text: true,
                                    className: "ml-2 w-2rem h-2rem",
                                    disabled: layoutConfig.scale === scales[scales.length - 1]
                                }
                            )
                            ]
                        }),
            /* @__PURE__ */ jsx("h5", { children: "Menu Type" }),
            /* @__PURE__ */ jsxs("div", {
                            className: "flex", children: [
              /* @__PURE__ */ jsxs("div", {
                                className: "flex-1 field-radiobutton", children: [
                /* @__PURE__ */ jsx(
                                    RadioButton,
                                    {
                                        name: "menuMode",
                                        value: "static",
                                        checked: layoutConfig.menuMode === "static",
                                        onChange: (e) => changeMenuMode(e),
                                        inputId: "mode1"
                                    }
                                ),
                /* @__PURE__ */ jsx("label", { htmlFor: "mode1", children: "Static" })
                                ]
                            }),
              /* @__PURE__ */ jsxs("div", {
                                className: "flex-1 field-radiobutton", children: [
                /* @__PURE__ */ jsx(
                                    RadioButton,
                                    {
                                        name: "menuMode",
                                        value: "overlay",
                                        checked: layoutConfig.menuMode === "overlay",
                                        onChange: (e) => changeMenuMode(e),
                                        inputId: "mode2"
                                    }
                                ),
                /* @__PURE__ */ jsx("label", { htmlFor: "mode2", children: "Overlay" })
                                ]
                            })
                            ]
                        }),
            /* @__PURE__ */ jsx("h5", { children: "Input Style" }),
            /* @__PURE__ */ jsxs("div", {
                            className: "flex", children: [
              /* @__PURE__ */ jsxs("div", {
                                className: "flex-1 field-radiobutton", children: [
                /* @__PURE__ */ jsx(
                                    RadioButton,
                                    {
                                        name: "inputStyle",
                                        value: "outlined",
                                        checked: layoutConfig.inputStyle === "outlined",
                                        onChange: (e) => changeInputStyle(e),
                                        inputId: "outlined_input"
                                    }
                                ),
                /* @__PURE__ */ jsx("label", { htmlFor: "outlined_input", children: "Outlined" })
                                ]
                            }),
              /* @__PURE__ */ jsxs("div", {
                                className: "flex-1 field-radiobutton", children: [
                /* @__PURE__ */ jsx(
                                    RadioButton,
                                    {
                                        name: "inputStyle",
                                        value: "filled",
                                        checked: layoutConfig.inputStyle === "filled",
                                        onChange: (e) => changeInputStyle(e),
                                        inputId: "filled_input"
                                    }
                                ),
                /* @__PURE__ */ jsx("label", { htmlFor: "filled_input", children: "Filled" })
                                ]
                            })
                            ]
                        }),
            /* @__PURE__ */ jsx("h5", { children: "Ripple Effect" }),
            /* @__PURE__ */ jsx(InputSwitch, { checked: layoutConfig.ripple, onChange: (e) => changeRipple(e) })
                        ]
                    }),
          /* @__PURE__ */ jsx("h5", { children: "Bootstrap" }),
          /* @__PURE__ */ jsxs("div", {
                        className: "grid", children: [
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/bootstrap4-light-blue.svg",
                                imgAlt: "Bootstrap Light Blue",
                                onClick: () => _changeTheme("bootstrap4-light-blue", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/bootstrap4-light-purple.svg",
                                imgAlt: "Bootstrap Light Purple",
                                onClick: () => _changeTheme("bootstrap4-light-purple", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/bootstrap4-dark-blue.svg",
                                imgAlt: "Bootstrap Dark Blue",
                                onClick: () => _changeTheme("bootstrap4-dark-blue", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/bootstrap4-dark-purple.svg",
                                imgAlt: "Bootstrap Dark Purple",
                                onClick: () => _changeTheme("bootstrap4-dark-purple", "dark")
                            }
                        )
                        ]
                    }),
          /* @__PURE__ */ jsx("h5", { children: "Material Design" }),
          /* @__PURE__ */ jsxs("div", {
                        className: "grid", children: [
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/md-light-indigo.svg",
                                imgAlt: "Material Light Indigo",
                                onClick: () => _changeTheme("md-light-indigo", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/md-light-deeppurple.svg",
                                imgAlt: "Material Light DeepPurple",
                                onClick: () => _changeTheme("md-light-deeppurple", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/md-dark-indigo.svg",
                                imgAlt: "Material Dark Indigo",
                                onClick: () => _changeTheme("md-dark-indigo", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/md-dark-deeppurple.svg",
                                imgAlt: "Material Dark DeepPurple",
                                onClick: () => _changeTheme("md-dark-deeppurple", "dark")
                            }
                        )
                        ]
                    }),
          /* @__PURE__ */ jsx("h5", { children: "Material Design Compact" }),
          /* @__PURE__ */ jsxs("div", {
                        className: "grid", children: [
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/md-light-indigo.svg",
                                imgAlt: "Material Light Indigo",
                                onClick: () => _changeTheme("mdc-light-indigo", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/md-light-deeppurple.svg",
                                imgAlt: "Material Light Deep Purple",
                                onClick: () => _changeTheme("mdc-light-deeppurple", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/md-dark-indigo.svg",
                                imgAlt: "Material Dark Indigo",
                                onClick: () => _changeTheme("mdc-dark-indigo", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/md-dark-deeppurple.svg",
                                imgAlt: "Material Dark Deep Purple",
                                onClick: () => _changeTheme("mdc-dark-deeppurple", "dark")
                            }
                        )
                        ]
                    }),
          /* @__PURE__ */ jsx("h5", { children: "Tailwind" }),
          /* @__PURE__ */ jsx("div", {
                        className: "grid", children: /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/tailwind-light.png",
                                imgAlt: "Tailwind Light",
                                onClick: () => _changeTheme("tailwind-light", "light")
                            }
                        )
                    }),
          /* @__PURE__ */ jsx("h5", { children: "Fluent UI" }),
          /* @__PURE__ */ jsx("div", {
                        className: "grid", children: /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/fluent-light.png",
                                imgAlt: "Fluent Light",
                                onClick: () => _changeTheme("fluent-light", "light")
                            }
                        )
                    }),
          /* @__PURE__ */ jsx("h5", { children: "PrimeOne Design - 2022" }),
          /* @__PURE__ */ jsxs("div", {
                        className: "grid", children: [
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/lara-light-indigo.png",
                                imgAlt: "Lara Light Indigo",
                                onClick: () => _changeTheme("lara-light-indigo", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/lara-light-blue.png",
                                imgAlt: "Lara Light Blue",
                                onClick: () => _changeTheme("lara-light-blue", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/lara-light-purple.png",
                                imgAlt: "Lara Light Purple",
                                onClick: () => _changeTheme("lara-light-purple", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/lara-light-teal.png",
                                imgAlt: "Lara Light Teal",
                                onClick: () => _changeTheme("lara-light-teal", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/lara-dark-indigo.png",
                                imgAlt: "Lara Dark Indigo",
                                onClick: () => _changeTheme("lara-dark-indigo", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/lara-dark-blue.png",
                                imgAlt: "Lara Dark Blue",
                                onClick: () => _changeTheme("lara-dark-blue", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/lara-dark-purple.png",
                                imgAlt: "Lara Dark Purple",
                                onClick: () => _changeTheme("lara-dark-purple", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/lara-dark-teal.png",
                                imgAlt: "Lara Dark Teal",
                                onClick: () => _changeTheme("lara-dark-teal", "dark")
                            }
                        )
                        ]
                    }),
          /* @__PURE__ */ jsx("h5", { children: "PrimeOne Design - 2021" }),
          /* @__PURE__ */ jsxs("div", {
                        className: "grid", children: [
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/saga-blue.png",
                                imgAlt: "Saga Blue",
                                onClick: () => _changeTheme("saga-blue", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/saga-green.png",
                                imgAlt: "Saga Green",
                                onClick: () => _changeTheme("saga-green", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/saga-orange.png",
                                imgAlt: "Saga Orange",
                                onClick: () => _changeTheme("saga-orange", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/saga-purple.png",
                                imgAlt: "Saga Purple",
                                onClick: () => _changeTheme("saga-purple", "light")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/vela-blue.png",
                                imgAlt: "Vela Blue",
                                onClick: () => _changeTheme("vela-blue", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/vela-green.png",
                                imgAlt: "Vela Green",
                                onClick: () => _changeTheme("vela-green", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/vela-orange.png",
                                imgAlt: "Vela Orange",
                                onClick: () => _changeTheme("vela-orange", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/vela-purple.png",
                                imgAlt: "Vela Purple",
                                onClick: () => _changeTheme("vela-purple", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/arya-blue.png",
                                imgAlt: "Arya Blue",
                                onClick: () => _changeTheme("arya-blue", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/arya-green.png",
                                imgAlt: "Arya Green",
                                onClick: () => _changeTheme("arya-green", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/arya-orange.png",
                                imgAlt: "Arya Orange",
                                onClick: () => _changeTheme("arya-orange", "dark")
                            }
                        ),
            /* @__PURE__ */ jsx(
                            AppConfigButton,
                            {
                                img: "/images/layout/themes/arya-purple.png",
                                imgAlt: "Arya Purple",
                                onClick: () => _changeTheme("arya-purple", "dark")
                            }
                        )
                        ]
                    })
                ]
            }
        )
        ]
    });
};
const AuthenticatedLayout = ({ header, children }) => {
    PrimeReactContext.ripple = true;
    const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const { setRipple } = useContext(PrimeReactContext);
    const topbarRef = useRef(null);
    const sidebarRef = useRef(null);
    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = useEventListener({
        type: "click",
        listener: (event) => {
            var _a, _b, _c, _d, _e, _f;
            const isOutsideClicked = !(((_a = sidebarRef.current) == null ? void 0 : _a.isSameNode(event.target)) || ((_b = sidebarRef.current) == null ? void 0 : _b.contains(event.target)) || ((_d = (_c = topbarRef.current) == null ? void 0 : _c.menubutton) == null ? void 0 : _d.isSameNode(event.target)) || ((_f = (_e = topbarRef.current) == null ? void 0 : _e.menubutton) == null ? void 0 : _f.contains(event.target)));
            if (isOutsideClicked) {
                hideMenu();
            }
        }
    });
    const pathname = route().current();
    useEffect(() => {
        hideMenu();
        hideProfileMenu();
    }, [pathname]);
    const [
        bindProfileMenuOutsideClickListener,
        unbindProfileMenuOutsideClickListener
    ] = useEventListener({
        type: "click",
        listener: (event) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const isOutsideClicked = !(((_b = (_a = topbarRef.current) == null ? void 0 : _a.topbarmenu) == null ? void 0 : _b.isSameNode(event.target)) || ((_d = (_c = topbarRef.current) == null ? void 0 : _c.topbarmenu) == null ? void 0 : _d.contains(event.target)) || ((_f = (_e = topbarRef.current) == null ? void 0 : _e.topbarmenubutton) == null ? void 0 : _f.isSameNode(event.target)) || ((_h = (_g = topbarRef.current) == null ? void 0 : _g.topbarmenubutton) == null ? void 0 : _h.contains(event.target)));
            if (isOutsideClicked) {
                hideProfileMenu();
            }
        }
    });
    const hideMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false
        }));
        unbindMenuOutsideClickListener();
        unblockBodyScroll();
    };
    const hideProfileMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: false
        }));
        unbindProfileMenuOutsideClickListener();
    };
    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add("blocked-scroll");
        } else {
            document.body.className += " blocked-scroll";
        }
    };
    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove("blocked-scroll");
        } else {
            document.body.className = document.body.className.replace(
                new RegExp(
                    "(^|\\b)" + "blocked-scroll".split(" ").join("|") + "(\\b|$)",
                    "gi"
                ),
                " "
            );
        }
    };
    useMountEffect(() => {
        setRipple(layoutConfig.ripple);
    });
    useEffect(() => {
        if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive) {
            bindMenuOutsideClickListener();
        }
        layoutState.staticMenuMobileActive && blockBodyScroll();
    }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);
    useEffect(() => {
        if (layoutState.profileSidebarVisible) {
            bindProfileMenuOutsideClickListener();
        }
    }, [layoutState.profileSidebarVisible]);
    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
        unbindProfileMenuOutsideClickListener();
    });
    const containerClass = classNames("layout-wrapper", {
        "layout-overlay": layoutConfig.menuMode === "overlay",
        "layout-static": layoutConfig.menuMode === "static",
        "layout-static-inactive": layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === "static",
        "layout-overlay-active": layoutState.overlayMenuActive,
        "layout-mobile-active": layoutState.staticMenuMobileActive,
        "p-input-filled": layoutConfig.inputStyle === "filled",
        "p-ripple-disabled": !layoutConfig.ripple
    });
    return /* @__PURE__ */ jsx(React.Fragment, {
        children: /* @__PURE__ */ jsxs("div", {
            className: containerClass, children: [
    /* @__PURE__ */ jsx(AppTopbar, { ref: topbarRef }),
    /* @__PURE__ */ jsx("div", { ref: sidebarRef, className: "layout-sidebar", children: /* @__PURE__ */ jsx(AppSidebar, {}) }),
    /* @__PURE__ */ jsxs("div", {
                className: "layout-main-container", children: [
                    header && /* @__PURE__ */ jsx("header", { className: "bg-white", children: /* @__PURE__ */ jsx("div", { className: "px-5 mx-auto max-w-7xl sm:px-6 lg:px-8", children: header }) }),
      /* @__PURE__ */ jsx("div", { className: "layout-main", children }),
      /* @__PURE__ */ jsx(AppFooter, {})
                ]
            }),
    /* @__PURE__ */ jsx(AppConfig, {}),
    /* @__PURE__ */ jsx("div", { className: "layout-mask" })
            ]
        })
    });
};
const TextAreaInput = forwardRef(function TextAreaInput2({ className = "", isFocused = false, children, ...props }, ref) {
    const input = ref ? ref : useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);
    return /* @__PURE__ */ jsx(
        "textarea",
        {
            ...props,
            className: "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " + className,
            ref: input,
            children
        }
    );
});
const SelectInput = forwardRef(function SelectInput2({ className = "", options = [], isMulti = false, defaultValue, ...props }, ref) {
    const localRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(isMulti ? [] : null);
    useEffect(() => {
        if (defaultValue) {
            const defaultOptions = isMulti ? options.filter((option) => defaultValue.includes(option.value)) : options.find((option) => option.value === defaultValue);
            setSelectedOption(defaultOptions);
        }
    }, [defaultValue, options, isMulti]);
    const handleChange = (option) => {
        setSelectedOption(option);
        if (props.onChange) {
            props.onChange(option);
        }
    };
    return /* @__PURE__ */ jsx(
        Select,
        {
            ...props,
            options,
            isMulti,
            classNamePrefix: "react-select",
            value: selectedOption,
            onChange: handleChange,
            className: `react-select-container ${className}`,
            ref: ref || localRef
        }
    );
});
function Create$3({ auth, users }) {
    const { data, setData, post, errors, reset } = useForm({
        "name": "",
        "type": "",
        "description": "",
        "participants": ""
    });
    const typeOptions = [
        {
            value: "group",
            label: "Group"
        },
        {
            value: "individual",
            label: "Individual"
        }
    ];
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("data submitted :", data);
        post(route("chat.room.store"), data);
    };
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Create Chat Room" }),
        /* @__PURE__ */ jsx(
                    Link,
                    {
                        href: route("chat.index"),
                        className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                        children: "Back"
                    }
                )
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Chat Room - Create" }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsx("div", {
                    className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("form", {
                            onSubmit, className: "p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Room Name" }),
            /* @__PURE__ */ jsx(TextInput, { id: "name", type: "text", name: "name", value: data.name, className: "w-full mt-1 " + (errors.name ? "border-red-500" : ""), isFocused: true, onChange: (e) => setData("name", e.target.value) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "type", value: "Chat Type" }),
            /* @__PURE__ */ jsx(
                                    SelectInput,
                                    {
                                        name: "type",
                                        id: "type",
                                        placeholder: "Select Type",
                                        className: `block w-full mt-1 cursor-pointer ${errors.type ? "border-red-500" : ""}`,
                                        options: typeOptions,
                                        onChange: (selectedOption) => setData("type", selectedOption ? selectedOption.value : "")
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.type, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "room_description", value: "Room Description" }),
            /* @__PURE__ */ jsx(
                                    TextAreaInput,
                                    {
                                        id: "room_description",
                                        name: "description",
                                        value: data.description,
                                        className: "block w-full mt-1 " + (errors.description ? "border-red-500" : ""),
                                        onChange: (e) => setData("description", e.target.value)
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "participants", value: "participants" }),
            /* @__PURE__ */ jsx(
                                    SelectInput,
                                    {
                                        name: "participants",
                                        id: "participants",
                                        isMulti: true,
                                        className: `block w-full mt-1 cursor-pointer ${errors.participants ? "border-red-500" : ""}`,
                                        placeholder: "Select user",
                                        options: users.data.map((user) => ({ value: user.id, label: user.name })),
                                        onChange: (selectedOptions) => {
                                            const participantIds = selectedOptions ? selectedOptions.map((option) => option.value) : [];
                                            setData("participants", participantIds);
                                        }
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.user_id, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4 text-right", children: [
            /* @__PURE__ */ jsx(
                                    Link,
                                    {
                                        href: route("chat.index"),
                                        className: "px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200",
                                        children: "Cancel"
                                    }
                                ),
            /* @__PURE__ */ jsx("button", { type: "submit", className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600", children: "Submit" })
                                ]
                            })
                            ]
                        })
                    })
                })
            })
            ]
        }
    );
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Create$3
}, Symbol.toStringTag, { value: "Module" }));
function Pagination({ Links, queryParams = {} }) {
    usePage();
    const filteredParams = Object.keys(queryParams).filter((param) => param !== "page").reduce((acc, key) => {
        acc[key] = queryParams[key];
        return acc;
    }, {});
    const urlParams = new URLSearchParams(filteredParams).toString();
    return /* @__PURE__ */ jsx("nav", {
        "aria-label": "Page navigation", className: "mt-4 text-center", children: /* @__PURE__ */ jsx("ul", {
            className: "inline-flex h-10 -space-x-px text-base", children: Links.map((link, index) => {
                const urlWithParams = link.url ? `${link.url}${link.url.includes("?") ? "&" : "?"}${urlParams}` : null;
                return /* @__PURE__ */ jsx("li", {
                    children: /* @__PURE__ */ jsx(
                        Link,
                        {
                            preserveScroll: true,
                            href: urlWithParams || "#",
                            className: `inline-block py-2 px-3 rounded-lg text-xs
                                    ${link.active ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}
                                    ${!link.url ? "cursor-not-allowed text-gray-400 dark:text-gray-600" : "hover:bg-gray-300 dark:hover:bg-gray-800"}`,
                            dangerouslySetInnerHTML: { __html: link.label },
                            onClick: (e) => {
                                if (!link.url || link.active) e.preventDefault();
                            }
                        }
                    )
                }, index);
            })
        })
    });
}
const SortIcon = forwardRef(function SortIcon2({ sortByField, currentField, sortDir, className = "", ...props }, ref) {
    return /* @__PURE__ */ jsx("div", {
        ref, ...props, className, children: sortByField === currentField ? sortDir === "ASC" ? /* @__PURE__ */ jsx(ChevronUpIcon, { className: "w-[10px] ms-1.5" }) : /* @__PURE__ */ jsx(ChevronDownIcon, { className: "w-[10px] ms-1.5" }) : /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col", children: [
    /* @__PURE__ */ jsx(ChevronUpIcon, { className: "w-[10px]  ms-1.5" }),
    /* @__PURE__ */ jsx(ChevronDownIcon, { className: "w-[10px]  ms-1.5" })
            ]
        })
    });
});
const TableHeading = forwardRef(function TableHeading2({ sortByField, currentField, sortDir, sortable = true, className = "", ...props }, ref) {
    return /* @__PURE__ */ jsx("th", {
        ref, ...props, className: `px-6 py-3 ${sortable && "cursor-pointer"} ` + className, scope: "col", children: /* @__PURE__ */ jsxs("div", {
            className: "flex items-center", children: [
                props.children,
                sortable && /* @__PURE__ */ jsx(SortIcon, { sortByField, currentField, sortDir })
            ]
        })
    });
});
function Room({ auth, room = null }) {
    var _a;
    const [messages, setMessages] = useState((room == null ? void 0 : room.messages) && []);
    const bottomRef = useRef(null);
    room == null ? void 0 : room.type;
    useEffect(() => {
        setMessages(room == null ? void 0 : room.messages);
        const channel = Echo.channel("chat");
        channel.listen("SendMessageEvent", (e) => {
            console.log("Message Received :", e);
            if (e.chatRoom && e.chatRoom.id === room.id) {
                setMessages((prevMessages) => [...prevMessages, e.message]);
                bottomRef.current.scrollTop = bottomRef.current.scrollHeight + 10;
            }
        });
        return () => {
            channel.stopListening("SendMessageEvent");
        };
    }, [room == null ? void 0 : room.id]);
    const { data, setData, post, errors, reset } = useForm({
        "message": "",
        "chat_room_id": room == null ? void 0 : room.id,
        "sender_id": (_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.id
    });
    const sendMessage = (e) => {
        e.preventDefault();
        console.log("data submitted :", data);
        axios$1.post(route("chat.send_message"), data).then((response) => {
            console.log("Message sent successfully", response.data);
            setData("message", "");
        }).catch((error) => {
            console.error("Error sending message", error.response.data);
        });
    };
    return /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col justify-between flex-1 h-[100%] w-full px-5", children: [
    /* @__PURE__ */ jsx("div", {
            className: "flex justify-between px-2 py-3 border-b-2 border-gray-200 sm:items-center", children: /* @__PURE__ */ jsxs("div", {
                className: ` items-center space-x-4 ${!(room == null ? void 0 : room.id) ? "hidden" : "relative flex"}`, children: [
      /* @__PURE__ */ jsxs("div", {
                    className: "relative", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 right-0 text-green-500", children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", children: /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "8", fill: "currentColor" }) }) }),
                        (room == null ? void 0 : room.profile_picture) && /* @__PURE__ */ jsx("img", { src: room.profile_picture, alt: room.room_name, className: "w-10 h-10 rounded-full sm:w-16 sm:h-16" })
                    ]
                }),
      /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col leading-tight", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center mt-1 text-2xl", children: /* @__PURE__ */ jsx("span", { className: "mr-3 text-gray-700", children: room == null ? void 0 : room.room_name }) }),
        /* @__PURE__ */ jsx("span", { className: "text-lg text-gray-600", children: room == null ? void 0 : room.room_description })
                    ]
                })
                ]
            })
        }),
    /* @__PURE__ */ jsx("div", {
            id: "messages", ref: bottomRef, className: "flex flex-col p-3 space-y-4 overflow-y-auto scrolling-touch scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2", children: messages == null ? void 0 : messages.map((message, index) => {
                var _a2;
                index === messages.length - 1;
                const senderImage = ((_a2 = message == null ? void 0 : message.sender) == null ? void 0 : _a2.profile_picture) || "";
                return message.sender.id != auth.user.id ? /* @__PURE__ */ jsx("div", {
                    className: "chat-message", children: /* @__PURE__ */ jsxs("div", {
                        className: "flex items-end", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start order-2 max-w-xs mx-2 space-y-2 text-xs", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg rounded-bl-none", children: message.message }) }) }),
                            senderImage != "" ? /* @__PURE__ */ jsx("img", { src: senderImage, alt: message.sender.name, className: "order-1 w-[30px] rounded-full" }) : null
                        ]
                    })
                }, message.id) : /* @__PURE__ */ jsx("div", {
                    className: "chat-message", children: /* @__PURE__ */ jsxs("div", {
                        className: "flex items-end justify-end", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-end order-1 max-w-xs mx-2 space-y-2 text-xs", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "inline-block px-4 py-2 text-white bg-blue-600 rounded-lg rounded-br-none ", children: message.message }) }) }),
                            senderImage != "" ? /* @__PURE__ */ jsx("img", { src: senderImage, alt: message.sender.name, className: "order-1 w-[30px] rounded-full" }) : null
                        ]
                    })
                }, message.id);
            })
        }),
    /* @__PURE__ */ jsx("div", {
            className: "px-4 pt-4 mb-2 border-t-2 border-gray-200 sm:mb-0", children: /* @__PURE__ */ jsxs("div", {
                className: `${!(room == null ? void 0 : room.id) ? "hidden" : "relative flex"}`, children: [
      /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        type: "text",
                        value: data.message,
                        placeholder: "Write your message!",
                        name: "message",
                        className: "w-full py-3 pl-12 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md focus:outline-none focus:placeholder-gray-400",
                        isFocused: true,
                        onChange: (e) => setData("message", e.target.value),
                        onKeyUp: (e) => {
                            if (e.key === "Enter") {
                                console.log("Enter key pressed");
                                sendMessage(e);
                            }
                        }
                    }
                ),
      /* @__PURE__ */ jsx(InputError, { message: errors.message }),
      /* @__PURE__ */ jsx("div", {
                    className: "absolute inset-y-0 right-0 items-center hidden sm:flex", children: /* @__PURE__ */ jsxs("button", {
                        onClick: (e) => {
                            sendMessage(e);
                        }, type: "button", className: "inline-flex items-center justify-center px-4 py-3 text-white transition duration-500 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none", children: [
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Send" }),
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-6 h-6 ml-2 transform rotate-90", children: /* @__PURE__ */ jsx("path", { d: "M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" }) })
                        ]
                    })
                })
                ]
            })
        })
        ]
    });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Room
}, Symbol.toStringTag, { value: "Module" }));
function UserSelectDropdown({ onSelectionChange, isMulti }) {
    const [options, setOptions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios$1.get(route("async.get_users"));
                const userOptions = response.data.map((user) => ({ value: user.id, label: user.name }));
                setOptions(userOptions);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);
    const handleChange = (selectedOptions) => {
        if (!isMulti) {
            selectedOptions = [selectedOptions];
        }
        setSelectedUsers(selectedOptions);
        console.log("selectedUsers", selectedOptions);
        let selectedUsers2 = selectedOptions.map((option) => option.value);
        onSelectionChange(selectedUsers2);
    };
    return /* @__PURE__ */ jsx(
        SelectInput,
        {
            isMulti,
            options,
            value: selectedUsers,
            onChange: handleChange,
            className: "w-full",
            placeholder: "Select user..."
        }
    );
}
function MessageComposer({ auth, isGroupChat, onSendMessage }) {
    const [message, setMessage] = useState("");
    const [selectedUsersList, setSelectedUsersList] = useState([]);
    const handleSend = () => {
        console.log("user :", auth == null ? void 0 : auth.user);
        const messageData = {
            message,
            recipients: selectedUsersList
        };
        onSendMessage(messageData);
        setMessage("");
    };
    return /* @__PURE__ */ jsxs("div", {
        className: "p-4 border rounded shadow-lg", children: [
    /* @__PURE__ */ jsx(UserSelectDropdown, {
            isMulti: isGroupChat, onSelectionChange: (selectedUsers) => {
                setSelectedUsersList(selectedUsers);
            }
        }),
    /* @__PURE__ */ jsx(
            "textarea",
            {
                value: message,
                onChange: (e) => setMessage(e.target.value),
                placeholder: "Type your message...",
                className: "w-full p-2 mt-2 border rounded"
            }
        ),
    /* @__PURE__ */ jsx(
            "button",
            {
                onClick: handleSend,
                className: "px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600",
                children: "Send"
            }
        )
        ]
    });
}
function ChatButton({ className }) {
    const [showOptions, setShowOptions] = useState(false);
    const [chatType, setChatType] = useState(null);
    const handleOptionClick = (type) => {
        setChatType(type);
        setShowOptions(false);
    };
    return /* @__PURE__ */ jsxs("div", {
        className: "sticky bottom-3 flex justify-end " + className, children: [
    /* @__PURE__ */ jsx(
            "button",
            {
                className: "p-3 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600",
                onClick: () => setShowOptions(!showOptions),
                children: "Chat"
            }
        ),
            showOptions && /* @__PURE__ */ jsxs("div", {
                className: "absolute right-0 w-40 p-2 bg-white border rounded shadow-lg bottom-14", children: [
      /* @__PURE__ */ jsx(
                    "button",
                    {
                        className: "block w-full px-4 py-2 text-left hover:bg-gray-100",
                        onClick: () => handleOptionClick("private"),
                        children: "Private Chat"
                    }
                ),
      /* @__PURE__ */ jsx(
                    "button",
                    {
                        className: "block w-full px-4 py-2 text-left hover:bg-gray-100",
                        onClick: () => handleOptionClick("group"),
                        children: "Group Chat"
                    }
                )
                ]
            }),
            chatType && /* @__PURE__ */ jsx("div", {
                className: "absolute bottom-0 left-0 w-full p-4 bg-white border-t", children: /* @__PURE__ */ jsx(
                    MessageComposer,
                    {
                        isGroupChat: chatType === "group",
                        onSendMessage: (messageData) => {
                            console.log("Message sent:", messageData);
                            setChatType(null);
                        }
                    }
                )
            })
        ]
    });
}
function ChatRoomList({ auth, user, withSearch = false, onSelection, className }) {
    var _a;
    const currentUserId = (user == null ? void 0 : user.id) ? user.id : (_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.id;
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [search, setSearch] = useState(null);
    const fetchRooms = async (userId = currentUserId, searchQuery = "") => {
        try {
            let payload = {
                user_id: userId ? userId : auth.user.id
            };
            if (searchQuery) {
                payload.search = searchQuery;
            } else {
                payload.search = "";
            }
            const response = await axios.get(route("async.get_user_chat_rooms"), {
                params: payload
            });
            setRooms(response.data);
        } catch (error) {
            console.error("Error fetching user Chat rooms:", error);
        }
    };
    useEffect(() => {
        fetchRooms();
    }, [auth, user]);
    useEffect(() => {
        if (onSelection) {
            onSelection(selectedRoom);
        }
    }, [selectedRoom == null ? void 0 : selectedRoom.id]);
    useEffect(() => {
        const channel = Echo.channel("chat");
        channel.listen("ChatRoomCreatedEvent", (e) => {
            var _a2;
            const chatParticipants = ((_a2 = e.chatRoom) == null ? void 0 : _a2.participants) || [];
            const thisUserExist = chatParticipants.some((participant) => {
                var _a3;
                return participant.id === ((_a3 = auth == null ? void 0 : auth.user) == null ? void 0 : _a3.id);
            });
            if (thisUserExist) {
                setRooms((prevRooms) => [...prevRooms, e.chatRoom]);
            }
        });
        return () => {
            channel.stopListening("ChatRoomCreatedEvent");
        };
    }, [auth.user.id]);
    const debouncedFetchRooms = useCallback(
        debounce((userId, searchQuery) => {
            fetchRooms(userId, searchQuery);
        }, 300),
        // 300ms debounce
        []
    );
    useEffect(() => {
        if (search) {
            debouncedFetchRooms(currentUserId, search);
        }
        return () => {
            debouncedFetchRooms.cancel();
        };
    }, [search, currentUserId, debouncedFetchRooms]);
    const searchChatRooms = async (value = "") => {
        if (value) {
            fetchRooms(currentUserId, value);
        } else {
            fetchRooms();
        }
    };
    const onKeyPress = async (name, e) => {
        if (e.key === "Enter") {
            searchChatRooms(e.target.value);
        }
    };
    return /* @__PURE__ */ jsxs("div", {
        className: `overflow-auto h-full relative ${className}`, children: [
    /* @__PURE__ */ jsxs("div", {
            className: "w-full p-4", children: [
                withSearch && /* @__PURE__ */ jsx("div", {
                    className: "sticky top-0 p-inputgroup", children: /* @__PURE__ */ jsxs("span", {
                        className: "p-input-icon-left", children: [
        /* @__PURE__ */ jsx("i", { className: "pi pi-search" }),
        /* @__PURE__ */ jsx(
                            InputText,
                            {
                                type: "text",
                                value: search || "",
                                onChange: (e) => setSearch(e.target.value),
                                onKeyDown: (e) => onKeyPress("search", e),
                                className: "w-full border-0",
                                placeholder: "Search..."
                            }
                        )
                        ]
                    })
                }),
      /* @__PURE__ */ jsx("ul", {
                    className: "p-0 m-0 list-none", children: rooms.map((room) => {
                        var _a2;
                        return /* @__PURE__ */ jsxs(
                            "li",
                            {
                                className: "flex justify-between p-2 mt-2 transition bg-white rounded-lg cursor-pointer hover:shadow-lg align-items-center",
                                onClick: () => setSelectedRoom(room),
                                children: [
              /* @__PURE__ */ jsxs("div", {
                                    className: "flex align-items-center", children: [
                /* @__PURE__ */ jsx(
                                        "img",
                                        {
                                            src: "https://i.imgur.com/aq39RMA.jpg",
                                            alt: "Room Avatar",
                                            width: "40",
                                            height: "40",
                                            className: "mr-3 rounded-full"
                                        }
                                    ),
                /* @__PURE__ */ jsxs("div", {
                                        children: [
                  /* @__PURE__ */ jsx("span", { className: "block font-medium text-black", children: room.room_name }),
                  /* @__PURE__ */ jsx("span", { className: "block w-32 text-sm text-gray-600 truncate", children: ((_a2 = room.messages) == null ? void 0 : _a2.length) > 0 ? room.messages[room.messages.length - 1].message : room.description })
                                        ]
                                    })
                                    ]
                                }),
              /* @__PURE__ */ jsxs("div", {
                                    className: "text-right", children: [
                /* @__PURE__ */ jsx("span", { className: "block text-gray-500", children: room.last_message_timestamp }),
                /* @__PURE__ */ jsx("i", { className: "text-green-400 pi pi-star" })
                                    ]
                                })
                                ]
                            },
                            room.id
                        );
                    })
                })
            ]
        }),
    /* @__PURE__ */ jsx(ChatButton, {})
        ]
    });
}
function Index$3({ auth, sessionParams, rooms: initialRooms, queryParams = null, session = null }) {
    var _a;
    const [rooms, setRooms] = useState(((_a = initialRooms == null ? void 0 : initialRooms.data) == null ? void 0 : _a.length) ? initialRooms == null ? void 0 : initialRooms.data : []);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const updateURLParam = (key, value) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        const newRelativePathQuery = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState(null, "", newRelativePathQuery);
    };
    useEffect(() => {
        if ((queryParams == null ? void 0 : queryParams.chat) && rooms.length > 0) {
            console.log("room param :", queryParams == null ? void 0 : queryParams.chat);
            const room = rooms.find((room2) => room2.id == (queryParams == null ? void 0 : queryParams.chat));
            if (room) {
                console.log("room param found:", room);
                setSelectedRoom(room);
            }
        }
        console.log("query updated :", queryParams);
    }, [queryParams, rooms]);
    useEffect(() => {
        if (selectedRoom == null ? void 0 : selectedRoom.id) {
            queryParams.chat = selectedRoom == null ? void 0 : selectedRoom.id;
            updateURLParam("chat", selectedRoom == null ? void 0 : selectedRoom.id);
        }
    }, [selectedRoom == null ? void 0 : selectedRoom.id]);
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Rooms" }),
        /* @__PURE__ */ jsx("div", {
                className: "container mx-auto rounded-lg shadow-lg h-[700px] py-2 w-full", children: /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-row justify-between bg-white h-[100%]", children: [
          /* @__PURE__ */ jsx(ChatRoomList, {
                        className: "w-[25%]", withSearch: true, user: auth.user, auth, onSelection: (val) => {
                            setSelectedRoom(val);
                        }
                    }),
          /* @__PURE__ */ jsx(Room, { room: selectedRoom, auth })
                    ]
                })
            })
            ]
        }
    );
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Index$3
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard({ auth, projects, tasks }) {
    const { completedTasks, inProgressTasks, pendingTasks, totalTasksCount } = tasks;
    const { pendingProjects, inProgressProjects, completedProjects, totalProjectsCount } = projects;
    Echo.channel("chat").listen("SendMessageEvent", (e) => {
        console.log("Message Recieved :", e);
    });
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Dashboard" }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsxs("div", {
                className: "py-12", children: [
          /* @__PURE__ */ jsxs("div", {
                    className: "grid grid-cols-3 gap-2 mx-auto my-3 max-w-7xl sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", {
                            className: "p-6 text-gray-900 dark:text-gray-100", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-amber-500", children: "Pending Projects" }),
              /* @__PURE__ */ jsxs("p", {
                                className: "mt-4 text-xl", children: [
                /* @__PURE__ */ jsx("span", { className: "mr-2", children: pendingProjects }),
                                    "/",
                /* @__PURE__ */ jsx("span", { className: "ml-2", children: totalProjectsCount })
                                ]
                            })
                            ]
                        })
                    }),
            /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", {
                            className: "p-6 text-gray-900 dark:text-gray-100", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-blue-500", children: "In Progress Projects" }),
              /* @__PURE__ */ jsxs("p", {
                                className: "mt-4 text-xl", children: [
                /* @__PURE__ */ jsx("span", { className: "mr-2", children: inProgressProjects }),
                                    "/",
                /* @__PURE__ */ jsx("span", { className: "ml-2", children: totalProjectsCount })
                                ]
                            })
                            ]
                        })
                    }),
            /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", {
                            className: "p-6 text-gray-900 dark:text-gray-100", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-green-500", children: "Completed Projects" }),
              /* @__PURE__ */ jsxs("p", {
                                className: "mt-4 text-xl", children: [
                /* @__PURE__ */ jsx("span", { className: "mr-2", children: completedProjects }),
                                    "/",
                /* @__PURE__ */ jsx("span", { className: "ml-2", children: totalProjectsCount })
                                ]
                            })
                            ]
                        })
                    })
                    ]
                }),
          /* @__PURE__ */ jsxs("div", {
                    className: "grid grid-cols-3 gap-2 mx-auto my-3 max-w-7xl sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", {
                            className: "p-6 text-gray-900 dark:text-gray-100", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-amber-500", children: "Pending Tasks" }),
              /* @__PURE__ */ jsxs("p", {
                                className: "mt-4 text-xl", children: [
                /* @__PURE__ */ jsx("span", { className: "mr-2", children: pendingTasks }),
                                    "/",
                /* @__PURE__ */ jsx("span", { className: "ml-2", children: totalTasksCount })
                                ]
                            })
                            ]
                        })
                    }),
            /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", {
                            className: "p-6 text-gray-900 dark:text-gray-100", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-blue-500", children: "In Progress Tasks" }),
              /* @__PURE__ */ jsxs("p", {
                                className: "mt-4 text-xl", children: [
                /* @__PURE__ */ jsx("span", { className: "mr-2", children: inProgressTasks }),
                                    "/",
                /* @__PURE__ */ jsx("span", { className: "ml-2", children: totalTasksCount })
                                ]
                            })
                            ]
                        })
                    }),
            /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", {
                            className: "p-6 text-gray-900 dark:text-gray-100", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-green-500", children: "Completed Tasks" }),
              /* @__PURE__ */ jsxs("p", {
                                className: "mt-4 text-xl", children: [
                /* @__PURE__ */ jsx("span", { className: "mr-2", children: completedTasks }),
                                    "/",
                /* @__PURE__ */ jsx("span", { className: "ml-2", children: totalTasksCount })
                                ]
                            })
                            ]
                        })
                    })
                    ]
                })
                ]
            })
            ]
        }
    );
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
function DangerButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return /* @__PURE__ */ jsx(
        "button",
        {
            ...props,
            className: `inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${disabled && "opacity-25"} ` + className,
            disabled,
            children
        }
    );
}
function Modal({
    children,
    show = false,
    maxWidth = "2xl",
    closeable = true,
    onClose = () => {
    }
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };
    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl"
    }[maxWidth];
    return /* @__PURE__ */ jsx(Transition, {
        show, leave: "duration-200", children: /* @__PURE__ */ jsxs(
            Dialog,
            {
                as: "div",
                id: "modal",
                className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
                onClose: close,
                children: [
        /* @__PURE__ */ jsx(
                    TransitionChild,
                    {
                        enter: "ease-out duration-300",
                        enterFrom: "opacity-0",
                        enterTo: "opacity-100",
                        leave: "ease-in duration-200",
                        leaveFrom: "opacity-100",
                        leaveTo: "opacity-0",
                        children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
                    }
                ),
        /* @__PURE__ */ jsx(
                    TransitionChild,
                    {
                        enter: "ease-out duration-300",
                        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                        enterTo: "opacity-100 translate-y-0 sm:scale-100",
                        leave: "ease-in duration-200",
                        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
                        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                        children: /* @__PURE__ */ jsx(
                            DialogPanel,
                            {
                                className: `mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`,
                                children
                            }
                        )
                    }
                )
                ]
            }
        )
    });
}
function SecondaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}) {
    return /* @__PURE__ */ jsx(
        "button",
        {
            ...props,
            type,
            className: `inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${disabled && "opacity-25"} ` + className,
            disabled,
            children
        }
    );
}
function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors
    } = useForm({
        password: ""
    });
    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };
    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset()
        });
    };
    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };
    return /* @__PURE__ */ jsxs("section", {
        className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", {
            children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Delete Account" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain." })
            ]
        }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: "Delete Account" }),
    /* @__PURE__ */ jsx(Modal, {
            show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", {
                onSubmit: deleteUser, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Are you sure you want to delete your account?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
      /* @__PURE__ */ jsxs("div", {
                    className: "mt-6", children: [
        /* @__PURE__ */ jsx(
                        InputLabel,
                        {
                            htmlFor: "password",
                            value: "Password",
                            className: "sr-only"
                        }
                    ),
        /* @__PURE__ */ jsx(
                        TextInput,
                        {
                            id: "password",
                            type: "password",
                            name: "password",
                            ref: passwordInput,
                            value: data.password,
                            onChange: (e) => setData("password", e.target.value),
                            className: "mt-1 block w-3/4",
                            isFocused: true,
                            placeholder: "Password"
                        }
                    ),
        /* @__PURE__ */ jsx(
                        InputError,
                        {
                            message: errors.password,
                            className: "mt-2"
                        }
                    )
                    ]
                }),
      /* @__PURE__ */ jsxs("div", {
                    className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: "Cancel" }),
        /* @__PURE__ */ jsx(DangerButton, { className: "ms-3", disabled: processing, children: "Delete Account" })
                    ]
                })
                ]
            })
        })
        ]
    });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: ""
    });
    const updatePassword = (e) => {
        e.preventDefault();
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors2) => {
                if (errors2.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }
                if (errors2.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            }
        });
    };
    return /* @__PURE__ */ jsxs("section", {
        className, children: [
    /* @__PURE__ */ jsxs("header", {
            children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Update Password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Ensure your account is using a long, random password to stay secure." })
            ]
        }),
    /* @__PURE__ */ jsxs("form", {
            onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", {
                children: [
        /* @__PURE__ */ jsx(
                    InputLabel,
                    {
                        htmlFor: "current_password",
                        value: "Current Password"
                    }
                ),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "current_password",
                        ref: currentPasswordInput,
                        value: data.current_password,
                        onChange: (e) => setData("current_password", e.target.value),
                        type: "password",
                        className: "mt-1 block w-full",
                        autoComplete: "current-password"
                    }
                ),
        /* @__PURE__ */ jsx(
                    InputError,
                    {
                        message: errors.current_password,
                        className: "mt-2"
                    }
                )
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "New Password" }),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "password",
                        ref: passwordInput,
                        value: data.password,
                        onChange: (e) => setData("password", e.target.value),
                        type: "password",
                        className: "mt-1 block w-full",
                        autoComplete: "new-password"
                    }
                ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                children: [
        /* @__PURE__ */ jsx(
                    InputLabel,
                    {
                        htmlFor: "password_confirmation",
                        value: "Confirm Password"
                    }
                ),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "password_confirmation",
                        value: data.password_confirmation,
                        onChange: (e) => setData("password_confirmation", e.target.value),
                        type: "password",
                        className: "mt-1 block w-full",
                        autoComplete: "new-password"
                    }
                ),
        /* @__PURE__ */ jsx(
                    InputError,
                    {
                        message: errors.password_confirmation,
                        className: "mt-2"
                    }
                )
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
                    Transition,
                    {
                        show: recentlySuccessful,
                        enter: "transition ease-in-out",
                        enterFrom: "opacity-0",
                        leave: "transition ease-in-out",
                        leaveTo: "opacity-0",
                        children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
                    }
                )
                ]
            })
            ]
        })
        ]
    });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = ""
}) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email
    });
    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };
    return /* @__PURE__ */ jsxs("section", {
        className, children: [
    /* @__PURE__ */ jsxs("header", {
            children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Profile Information" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Update your account's profile information and email address." })
            ]
        }),
    /* @__PURE__ */ jsxs("form", {
            onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", {
                children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "name",
                        className: "mt-1 block w-full",
                        value: data.name,
                        onChange: (e) => setData("name", e.target.value),
                        required: true,
                        isFocused: true,
                        autoComplete: "name"
                    }
                ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "email",
                        type: "email",
                        className: "mt-1 block w-full",
                        value: data.email,
                        onChange: (e) => setData("email", e.target.value),
                        required: true,
                        autoComplete: "username"
                    }
                ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
                ]
            }),
                mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", {
                    children: [
        /* @__PURE__ */ jsxs("p", {
                        className: "mt-2 text-sm text-gray-800", children: [
                            "Your email address is unverified.",
          /* @__PURE__ */ jsx(
                                Link,
                                {
                                    href: route("verification.send"),
                                    method: "post",
                                    as: "button",
                                    className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                                    children: "Click here to re-send the verification email."
                                }
                            )
                        ]
                    }),
                        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-green-600", children: "A new verification link has been sent to your email address." })
                    ]
                }),
      /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
                        Transition,
                        {
                            show: recentlySuccessful,
                            enter: "transition ease-in-out",
                            enterFrom: "opacity-0",
                            leave: "transition ease-in-out",
                            leaveTo: "opacity-0",
                            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
                        }
                    )
                    ]
                })
            ]
        })
        ]
    });
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfilePictureForm({
    mustVerifyEmail,
    status,
    className = ""
}) {
    const user = usePage().props.auth.user;
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        picture: user.profile_picture,
        user_id: user.id,
        user_name: user.name
    });
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("profile.update_picture"), {
            ...data,
            onSuccess: () => {
                toast.success("Profile picture updated successfully!");
            },
            onError: (errors2) => {
                console.log(errors2);
                toast.error("Failed to update profile picture. Please try again.");
            }
        });
    };
    return /* @__PURE__ */ jsxs("section", {
        className, children: [
    /* @__PURE__ */ jsxs("header", {
            children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Profile Picture" }),
      /* @__PURE__ */ jsx("div", {
                className: "mb-1", children: user.profile_picture && /* @__PURE__ */ jsx(
                    "img",
                    {
                        className: "object-cover w-20 h-20 rounded-full",
                        src: user.profile_picture,
                        alt: user.name
                    }
                )
            })
            ]
        }),
    /* @__PURE__ */ jsxs("form", {
            onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", {
                children: [
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        id: "picture",
                        type: "file",
                        name: "picture",
                        className: "w-full mt-1 form-input " + (errors.picture ? "border-red-500" : ""),
                        onChange: (e) => setData("picture", e.target.files[0])
                    }
                ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.picture })
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
                    Transition,
                    {
                        show: recentlySuccessful,
                        enter: "transition ease-in-out",
                        enterFrom: "opacity-0",
                        leave: "transition ease-in-out",
                        leaveTo: "opacity-0",
                        children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
                    }
                )
                ]
            })
            ]
        })
        ]
    });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: UpdateProfilePictureForm
}, Symbol.toStringTag, { value: "Module" }));
function Edit$3({ auth, mustVerifyEmail, status }) {
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Profile" }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsxs("div", {
                    className: "mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", {
                        className: "p-4 bg-white shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(
                            UpdateProfilePictureForm,
                            {
                                mustVerifyEmail,
                                status,
                                className: "max-w-xl"
                            }
                        )
                    }),
          /* @__PURE__ */ jsx("div", { className: "p-4 bg-white shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 bg-white shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
                    ]
                })
            })
            ]
        }
    );
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Edit$3
}, Symbol.toStringTag, { value: "Module" }));
const PROJECT_STATUS_CLASS_MAP = {
    pending: "bg-amber-500",
    in_progress: "bg-blue-500 ",
    completed: "bg-green-500"
};
const PROJECT_STATUS_TEXT_MAP = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed"
};
const TASK_STATUS_CLASS_MAP = {
    pending: "bg-amber-500",
    in_progress: "bg-blue-500",
    completed: "bg-green-500"
};
const TASK_STATUS_TEXT_MAP = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed"
};
const TASK_PRIORITY_TEXT_MAP = {
    low: "Low",
    medium: "Medium",
    high: "High"
};
function Create$2({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        "name": "",
        "image": "",
        "description": "",
        "due_date": "",
        "status": ""
    });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("projects.store"), data);
    };
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Create Project" }),
        /* @__PURE__ */ jsx(
                    Link,
                    {
                        href: route("projects.index"),
                        className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                        children: "Back"
                    }
                )
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Projects - Create" }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsx("div", {
                    className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("form", {
                            onSubmit, className: "p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Project Name" }),
            /* @__PURE__ */ jsx(TextInput, { id: "name", type: "text", name: "name", value: data.name, className: "w-full mt-1 " + (errors.name ? "border-red-500" : ""), isFocused: true, onChange: (e) => setData("name", e.target.value) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "image", value: "Project Image" }),
            /* @__PURE__ */ jsx(
                                    TextInput,
                                    {
                                        id: "image",
                                        type: "file",
                                        name: "image",
                                        className: "w-full mt-1 form-input " + (errors.image ? "border-red-500" : ""),
                                        onChange: (e) => setData("image", e.target.files[0])
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.image, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "desc", value: "Project Description" }),
            /* @__PURE__ */ jsx(
                                    TextAreaInput,
                                    {
                                        id: "project_description",
                                        name: "description",
                                        value: data.description,
                                        className: "block w-full mt-1 " + (errors.description ? "border-red-500" : ""),
                                        onChange: (e) => setData("description", e.target.value)
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "project_status", value: "Project Status" }),
            /* @__PURE__ */ jsx(
                                    SelectInput,
                                    {
                                        name: "status",
                                        id: "project_status",
                                        placeholder: "Select Status",
                                        className: `block w-full mt-1 cursor-pointer ${errors.status ? "border-red-500" : ""}`,
                                        options: Object.entries(PROJECT_STATUS_TEXT_MAP).map(([status, text]) => ({
                                            value: status,
                                            label: text
                                        })),
                                        onChange: (selectedOption) => setData("status", selectedOption ? selectedOption.value : "")
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "due_date", value: "Project Due Date" }),
            /* @__PURE__ */ jsx(TextInput, { id: "due_date", type: "date", name: "due_date", value: data.due_date, className: "w-full mt-1 " + (errors.due_date ? "border-red-500" : ""), onChange: (e) => setData("due_date", e.target.value) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.due_date, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4 text-right", children: [
            /* @__PURE__ */ jsx(
                                    Link,
                                    {
                                        href: route("projects.index"),
                                        className: "px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200",
                                        children: "Cancel"
                                    }
                                ),
            /* @__PURE__ */ jsx("button", { type: "submit", className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600", children: "Submit" })
                                ]
                            })
                            ]
                        })
                    })
                })
            })
            ]
        }
    );
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Create$2
}, Symbol.toStringTag, { value: "Module" }));
function Edit$2({ auth, project }) {
    const { data, setData, errors, reset, post } = useForm({
        "name": project.name || "",
        "description": project.description || "",
        "status": project.status || "",
        "due_date": project.due_date || "",
        "image": "",
        "_method": "PUT"
    });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("projects.update", project.id), data);
    };
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("h2", {
                    className: "text-xl font-semibold leading-tight text-gray-800", children: [
                        'Edit Project "',
                        project.name,
                        '"'
                    ]
                }),
        /* @__PURE__ */ jsx(
                    Link,
                    {
                        href: route("projects.index"),
                        className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                        children: "Back"
                    }
                )
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Projects - Edit" }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsx("div", {
                    className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("form", {
                            onSubmit, className: "p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg", children: [
                                project.image_path && /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("img", { src: project.image_path, className: "w-64" }) }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Project Name" }),
            /* @__PURE__ */ jsx(TextInput, { id: "name", type: "text", name: "name", value: data.name, className: "w-full mt-1 " + (errors.name ? "border-red-500" : ""), isFocused: true, onChange: (e) => setData("name", e.target.value) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "image", value: "Project Image" }),
            /* @__PURE__ */ jsx(
                                        TextInput,
                                        {
                                            id: "image",
                                            type: "file",
                                            name: "image",
                                            className: "w-full mt-1 form-input " + (errors.image ? "border-red-500" : ""),
                                            onChange: (e) => setData("image", e.target.files[0])
                                        }
                                    ),
            /* @__PURE__ */ jsx(InputError, { message: errors.image, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "desc", value: "Project Description" }),
            /* @__PURE__ */ jsx(
                                        TextAreaInput,
                                        {
                                            id: "project_description",
                                            name: "description",
                                            value: data.description,
                                            className: "block w-full mt-1 " + (errors.description ? "border-red-500" : ""),
                                            onChange: (e) => setData("description", e.target.value)
                                        }
                                    ),
            /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "project_status", value: "Project Status" }),
            /* @__PURE__ */ jsx(
                                        SelectInput,
                                        {
                                            name: "status",
                                            id: "project_status",
                                            placeholder: "Select Status",
                                            defaultValue: data.status,
                                            className: `block w-full mt-1 cursor-pointer ${errors.status ? "border-red-500" : ""}`,
                                            options: Object.entries(PROJECT_STATUS_TEXT_MAP).map(([status, text]) => ({
                                                value: status,
                                                label: text
                                            })),
                                            onChange: (selectedOption) => setData("status", selectedOption ? selectedOption.value : "")
                                        }
                                    ),
            /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "due_date", value: "Project Due Date" }),
            /* @__PURE__ */ jsx(TextInput, { id: "due_date", type: "date", name: "due_date", value: data.due_date, className: "w-full mt-1 " + (errors.due_date ? "border-red-500" : ""), onChange: (e) => setData("due_date", e.target.value) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.due_date, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-4 text-right", children: [
            /* @__PURE__ */ jsx(
                                        Link,
                                        {
                                            href: route("projects.index"),
                                            className: "px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200",
                                            children: "Cancel"
                                        }
                                    ),
            /* @__PURE__ */ jsx("button", { type: "submit", className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600", children: "Submit" })
                                    ]
                                })
                            ]
                        })
                    })
                })
            })
            ]
        }
    );
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Edit$2
}, Symbol.toStringTag, { value: "Module" }));
function Index$2({ auth, sessionParams, projects, queryParams = null, session = null }) {
    sessionParams = sessionParams || {};
    queryParams = queryParams || {};
    const sortByField = queryParams.sortBy || "created_at";
    const sortDir = queryParams.sortDir || "DESC";
    const searchFieldChanged = async (name, value) => {
        if (name == "submit" && value == "submit") {
            router.get(route("projects.index"), queryParams);
            return;
        } else if (name == "clear" && value == "clear") {
            if ((queryParams == null ? void 0 : queryParams.page) && queryParams.page > 0) {
                router.get(route("projects.index"), { page: queryParams.page });
                return;
            }
            queryParams = {};
            router.get(route("projects.index"));
            return;
        } else if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("projects.index", queryParams));
    };
    const onKeyPress = async (name, e) => {
        if (e.key == "Enter") {
            searchFieldChanged(name, e.target.value);
        }
    };
    const sortBy = async (name) => {
        if (name == queryParams.sortBy) {
            queryParams.sortDir = queryParams.sortDir == "ASC" ? "DESC" : "ASC";
        } else {
            queryParams.sortBy = name;
            queryParams.sortDir = "ASC";
        }
        router.get(route("projects.index", queryParams));
    };
    const deleteProject = (project) => {
        if (confirm("Are you sure you want to delete this project?")) {
            router.delete(route("projects.destroy", project.id));
        }
    };
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Projects" }),
        /* @__PURE__ */ jsx(
                    Link,
                    {
                        href: route("projects.create"),
                        className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                        children: "Add new"
                    }
                )
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Projects" }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsx("div", {
                    className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", {
                        className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", {
                            className: "flex flex-col items-center justify-between gap-4 p-6 mb-6 bg-white rounded-lg shadow-md sm:flex-row dark:bg-gray-800", children: [
            /* @__PURE__ */ jsxs("div", {
                                className: "flex items-center w-full sm:w-auto", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "search", className: "sr-only", children: "Search" }),
              /* @__PURE__ */ jsx(
                                    TextInput,
                                    {
                                        type: "text",
                                        id: "search",
                                        placeholder: "Search by name...",
                                        defaultValue: queryParams.search,
                                        className: "block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500",
                                        onBlur: (e) => searchFieldChanged("search", e.target.value),
                                        onKeyPress: (e) => onKeyPress("search", e)
                                    }
                                )
                                ]
                            }),
            /* @__PURE__ */ jsxs("div", {
                                className: "flex items-center w-full sm:w-auto", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "status", className: "sr-only", children: "Status" }),
              /* @__PURE__ */ jsx(
                                    SelectInput,
                                    {
                                        name: "status",
                                        id: "status",
                                        placeholder: "Select Status",
                                        className: `block w-full mt-1 cursor-pointer `,
                                        defaultValue: queryParams.status,
                                        options: Object.entries(PROJECT_STATUS_TEXT_MAP).map(([status, text]) => ({
                                            value: status,
                                            label: text
                                        })),
                                        value: queryParams.status,
                                        onChange: (selectedOption) => searchFieldChanged("status", selectedOption ? selectedOption.value : "")
                                    }
                                )
                                ]
                            }),
            /* @__PURE__ */ jsxs("div", {
                                className: "flex items-center w-full gap-4 sm:w-auto", children: [
              /* @__PURE__ */ jsxs("div", {
                                    children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "from-date", className: "sr-only", children: "From Date" }),
                /* @__PURE__ */ jsx(
                                        TextInput,
                                        {
                                            type: "date",
                                            id: "from-date",
                                            defaultValue: queryParams.from_date,
                                            className: "block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500",
                                            onBlur: (e) => searchFieldChanged("from_date", e.target.value),
                                            onKeyPress: (e) => onKeyPress("from_date", e)
                                        }
                                    )
                                    ]
                                }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "to" }),
              /* @__PURE__ */ jsxs("div", {
                                    children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "to-date", className: "sr-only", children: "To Date" }),
                /* @__PURE__ */ jsx(
                                        TextInput,
                                        {
                                            type: "date",
                                            id: "to-date",
                                            defaultValue: queryParams.to_date,
                                            className: "block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500",
                                            onBlur: (e) => searchFieldChanged("to_date", e.target.value),
                                            onKeyPress: (e) => onKeyPress("to_date", e)
                                        }
                                    )
                                    ]
                                })
                                ]
                            }),
            /* @__PURE__ */ jsx(
                                Button$1,
                                {
                                    className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800",
                                    onClick: (e) => searchFieldChanged("submit", "submit"),
                                    children: "Search"
                                }
                            ),
                                queryParams.search || queryParams.from_date || queryParams.to_date || queryParams.status ? /* @__PURE__ */ jsx(
                                    Button$1,
                                    {
                                        className: "px-4 py-2 text-sm font-sm text-white bg-gray-600 rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800",
                                        onClick: (e) => searchFieldChanged("clear", "clear"),
                                        children: "Clear Search"
                                    }
                                ) : null
                            ]
                        }),
          /* @__PURE__ */ jsxs("div", {
                            className: "relative overflow-x-auto shadow-md sm:rounded-lg", children: [
            /* @__PURE__ */ jsxs("table", {
                                className: "w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400", children: [
              /* @__PURE__ */ jsx("thead", {
                                    className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400", children: /* @__PURE__ */ jsxs("tr", {
                                        children: [
                /* @__PURE__ */ jsx(TableHeading, { sortable: false, children: "Sr. No" }),
                /* @__PURE__ */ jsx(TableHeading, { sortable: false, sortByField, currentField: "id", sortDir, children: "Image" }),
                /* @__PURE__ */ jsx(TableHeading, { onClick: () => sortBy("name"), sortByField, currentField: "name", sortDir, children: "Name" }),
                /* @__PURE__ */ jsx(TableHeading, { onClick: () => sortBy("status"), sortByField, currentField: "status", sortDir, children: "Status" }),
                /* @__PURE__ */ jsx(TableHeading, { onClick: () => sortBy("created_at"), sortByField, currentField: "created_at", sortDir, children: "Created At" }),
                /* @__PURE__ */ jsx(TableHeading, { onClick: () => sortBy("due_date"), sortByField, currentField: "due_date", sortDir, children: "Due Date" }),
                /* @__PURE__ */ jsx(TableHeading, { sortable: false, sortByField, currentField: "created_by", sortDir, children: "Created By" }),
                /* @__PURE__ */ jsx(TableHeading, { sortable: false, className: "text-right", children: "Actions" })
                                        ]
                                    })
                                }),
              /* @__PURE__ */ jsx("tbody", {
                                    children: projects.data.map((project, index) => /* @__PURE__ */ jsxs("tr", {
                                        className: "bg-white border-b dark:bg-gray-800 dark:border-gray-700", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: index + 1 }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("img", { src: project.image_path, alt: project.name, className: "w-20 h-20 rounded-half" }) }),
                /* @__PURE__ */ jsx("th", { scope: "row", className: "px-6 py-4 font-medium text-gray-900 hover:underline whitespace-nowrap dark:text-white", children: /* @__PURE__ */ jsx(Link, { href: route("projects.show", project.id), children: project.name }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded text-gray-900 dark:text-white " + PROJECT_STATUS_CLASS_MAP[project.status], children: PROJECT_STATUS_TEXT_MAP[project.status] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: project.created_at }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: project.due_date }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: project.created_by.name }),
                /* @__PURE__ */ jsxs("td", {
                                            className: "px-6 py-4 text-nowrap", children: [
                  /* @__PURE__ */ jsx(Link, { href: route("projects.edit", { project: project.id }), className: "mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline", children: "Edit" }),
                  /* @__PURE__ */ jsx(Link, { onClick: (e) => deleteProject(project), className: "mx-1 font-medium text-red-600 dark:text-red-500 hover:underline", children: "Delete" })
                                            ]
                                        })
                                        ]
                                    }, project.id))
                                })
                                ]
                            }),
            /* @__PURE__ */ jsx(Pagination, { Links: projects.meta.links, className: "mx-auto", queryParams })
                            ]
                        })
                        ]
                    })
                })
            })
            ]
        }
    );
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Index$2
}, Symbol.toStringTag, { value: "Module" }));
function TasksTable({ tasks, queryParams, showProject = true }) {
    const currentRoute = route().current();
    queryParams = queryParams || {};
    const sortByField = queryParams.sortBy || "created_at";
    const sortDir = queryParams.sortDir || "DESC";
    const searchFieldChanged = async (name, value) => {
        if (name == "submit" && value == "submit") {
            router.get(route(currentRoute), queryParams);
            return;
        } else if (name == "clear" && value == "clear") {
            if ((queryParams == null ? void 0 : queryParams.page) && queryParams.page > 0) {
                router.get(route(currentRoute), { page: queryParams.page });
                return;
            }
            queryParams = {};
            router.get(route(currentRoute));
            return;
        } else if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route(currentRoute, queryParams));
    };
    const onKeyPress = async (name, e) => {
        if (e.key == "Enter") {
            searchFieldChanged(name, e.target.value);
        }
    };
    const sortBy = async (name) => {
        if (name == queryParams.sortBy) {
            queryParams.sortDir = queryParams.sortDir == "ASC" ? "DESC" : "ASC";
        } else {
            queryParams.sortBy = name;
            queryParams.sortDir = "ASC";
        }
        router.get(route(currentRoute, queryParams));
    };
    const deleteTask = (task) => {
        if (confirm("Are you sure you want to delete this task?")) {
            router.delete(route("tasks.destroy", task.id));
        }
    };
    return /* @__PURE__ */ jsxs("div", {
        className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: [
    /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col items-center justify-between gap-4 p-6 mb-6 bg-white rounded-lg shadow-md sm:flex-row dark:bg-gray-800", children: [
      /* @__PURE__ */ jsxs("div", {
                className: "flex items-center w-full sm:w-auto", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "search", className: "sr-only", children: "Search" }),
        /* @__PURE__ */ jsx(
                    TextInput,
                    {
                        type: "text",
                        id: "search",
                        placeholder: "Search ...",
                        defaultValue: queryParams.search,
                        className: "block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500",
                        onBlur: (e) => searchFieldChanged("search", e.target.value),
                        onKeyPress: (e) => onKeyPress("search", e)
                    }
                )
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                className: "flex items-center w-full sm:w-auto", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "status", className: "sr-only", children: "Status" }),
        /* @__PURE__ */ jsx(
                    SelectInput,
                    {
                        name: "status",
                        id: "status",
                        placeholder: "Select Status",
                        className: `block w-full mt-1 cursor-pointer `,
                        defaultValue: queryParams.status,
                        options: Object.entries(TASK_STATUS_TEXT_MAP).map(([status, text]) => ({
                            value: status,
                            label: text
                        })),
                        value: queryParams.status,
                        onChange: (selectedOption) => searchFieldChanged("status", selectedOption ? selectedOption.value : "")
                    }
                )
                ]
            }),
      /* @__PURE__ */ jsxs("div", {
                className: "flex items-center w-full gap-4 sm:w-auto", children: [
        /* @__PURE__ */ jsxs("div", {
                    children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "from-date", className: "sr-only", children: "Start Date" }),
          /* @__PURE__ */ jsx(
                        TextInput,
                        {
                            type: "date",
                            id: "from-date",
                            defaultValue: queryParams.from_date,
                            className: "block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500",
                            onBlur: (e) => searchFieldChanged("from_date", e.target.value),
                            onKeyPress: (e) => onKeyPress("from_date", e)
                        }
                    )
                    ]
                }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "to" }),
        /* @__PURE__ */ jsxs("div", {
                    children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "to-date", className: "sr-only", children: "To Date" }),
          /* @__PURE__ */ jsx(
                        TextInput,
                        {
                            type: "date",
                            id: "to-date",
                            defaultValue: queryParams.to_date,
                            className: "block w-full px-4 py-2 text-nowrap text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500",
                            onBlur: (e) => searchFieldChanged("to_date", e.target.value),
                            onKeyPress: (e) => onKeyPress("to_date", e)
                        }
                    )
                    ]
                })
                ]
            }),
      /* @__PURE__ */ jsx(
                Button$1,
                {
                    className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800",
                    onClick: (e) => searchFieldChanged("submit", "submit"),
                    children: "Search"
                }
            ),
                queryParams.search || queryParams.from_date || queryParams.to_date || queryParams.status ? /* @__PURE__ */ jsx(
                    Button$1,
                    {
                        className: "px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800",
                        onClick: (e) => searchFieldChanged("clear", "clear"),
                        children: "Clear Search"
                    }
                ) : null
            ]
        }),
    /* @__PURE__ */ jsxs("div", {
            className: "relative overflow-x-auto shadow-md sm:rounded-lg", children: [
      /* @__PURE__ */ jsxs("table", {
                className: "w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400", children: [
        /* @__PURE__ */ jsx("thead", {
                    className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400", children: /* @__PURE__ */ jsxs("tr", {
                        children: [
          /* @__PURE__ */ jsx(TableHeading, { sortable: false, children: "Sr. No" }),
          /* @__PURE__ */ jsx(TableHeading, { sortable: false, sortByField, currentField: "id", sortDir, children: "Image" }),
          /* @__PURE__ */ jsx(TableHeading, { onClick: () => sortBy("name"), sortByField, currentField: "name", sortDir, children: "Name" }),
          /* @__PURE__ */ jsx(TableHeading, { onClick: () => sortBy("status"), sortByField, currentField: "status", sortDir, children: "Status" }),
                            showProject ? /* @__PURE__ */ jsx(TableHeading, { onClick: () => sortBy("project"), sortByField, currentField: "project", sortDir, children: "Project Name" }) : null,
          /* @__PURE__ */ jsx(TableHeading, { sortable: false, children: "Priority" }),
          /* @__PURE__ */ jsx(TableHeading, { sortable: false, children: "Assigned To" }),
          /* @__PURE__ */ jsx(TableHeading, { onClick: () => sortBy("created_at"), sortByField, currentField: "created_at", sortDir, children: "Created At" }),
          /* @__PURE__ */ jsx(TableHeading, { sortable: false, sortByField, currentField: "created_by", sortDir, children: "Created By" }),
          /* @__PURE__ */ jsx(TableHeading, { sortable: false, className: "text-right", children: "Actions" })
                        ]
                    })
                }),
        /* @__PURE__ */ jsx("tbody", {
                    children: tasks.data.map((task, index) => /* @__PURE__ */ jsxs("tr", {
                        className: "bg-white border-b dark:bg-gray-800 dark:border-gray-700", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: index + 1 }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("img", { src: task.image_path, alt: task.name, className: "w-20 h-20 rounded-half" }) }),
          /* @__PURE__ */ jsx("th", { scope: "row", className: "px-6 py-4 font-medium text-gray-900 hover:underline whitespace-nowrap dark:text-white", children: /* @__PURE__ */ jsx(Link, { href: route("tasks.show", task.id), children: task.name }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded text-gray-900 dark:text-white " + TASK_STATUS_CLASS_MAP[task.status], children: TASK_STATUS_TEXT_MAP[task.status] }) }),
                            showProject ? /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: task.project.name }) : null,
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: task.priority }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: task.assigned_user.name }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: task.created_at }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: task.created_by.name }),
          /* @__PURE__ */ jsxs("td", {
                                className: "px-6 py-4", children: [
            /* @__PURE__ */ jsx(Link, { href: route("tasks.edit", { task: task.id }), className: "mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline", children: "Edit" }),
            /* @__PURE__ */ jsx(Link, { onClick: (e) => deleteTask(task), className: "mx-1 font-medium text-red-600 dark:text-red-500 hover:underline", children: "Delete" })
                                ]
                            })
                        ]
                    }, task.id))
                })
                ]
            }),
      /* @__PURE__ */ jsx(Pagination, { Links: tasks.meta.links, className: "mx-auto", queryParams })
            ]
        })
        ]
    });
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: TasksTable
}, Symbol.toStringTag, { value: "Module" }));
function Show$2({ auth, project, tasks, queryParams }) {
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("h2", {
                    className: "text-xl font-semibold leading-tight text-gray-800", children: [
                        "Project - ",
                        project.name
                    ]
                }),
        /* @__PURE__ */ jsxs("div", {
                    children: [
          /* @__PURE__ */ jsx(
                        Link,
                        {
                            href: route("projects.edit", project.id),
                            className: "px-3 py-1 mx-2 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                            children: "Edit"
                        }
                    ),
          /* @__PURE__ */ jsx(
                        Link,
                        {
                            href: route("projects.index"),
                            className: "px-3 py-1 mx-2 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                            children: "Back"
                        }
                    )
                    ]
                })
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: `Project - ${project.name}` }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsx("div", {
                    className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", {
                        className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg", children: [
          /* @__PURE__ */ jsx("div", {
                            children: /* @__PURE__ */ jsx(
                                "img",
                                {
                                    src: project.image_path,
                                    alt: "",
                                    className: "object-cover w-full h-64"
                                }
                            )
                        }),
          /* @__PURE__ */ jsxs("div", {
                            className: "p-6 text-gray-900 dark:text-gray-100", children: [
            /* @__PURE__ */ jsxs("div", {
                                className: "grid grid-cols-2 gap-1 mt-2", children: [
              /* @__PURE__ */ jsxs("div", {
                                    children: [
                /* @__PURE__ */ jsxs("div", {
                                        children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Project ID" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: project.id })
                                        ]
                                    }),
                /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Project Name" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: project.name })
                                        ]
                                    }),
                /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Project Status" }),
                  /* @__PURE__ */ jsx("p", {
                                            className: "mt-1", children: /* @__PURE__ */ jsx(
                                                "span",
                                                {
                                                    className: "px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status],
                                                    children: PROJECT_STATUS_TEXT_MAP[project.status]
                                                }
                                            )
                                        })
                                        ]
                                    }),
                /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Created By" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: project.created_by.name })
                                        ]
                                    })
                                    ]
                                }),
              /* @__PURE__ */ jsxs("div", {
                                    children: [
                /* @__PURE__ */ jsxs("div", {
                                        children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Due Date" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: project.due_date })
                                        ]
                                    }),
                /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Create Date" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: project.created_at })
                                        ]
                                    }),
                /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Updated By" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: project.updated_by.name })
                                        ]
                                    })
                                    ]
                                })
                                ]
                            }),
            /* @__PURE__ */ jsxs("div", {
                                className: "mt-4", children: [
              /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Project Description" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1", children: project.description })
                                ]
                            })
                            ]
                        })
                        ]
                    })
                })
            }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx(TasksTable, { tasks, queryParams, showProject: false }) }) })
            ]
        }
    );
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Show$2
}, Symbol.toStringTag, { value: "Module" }));
function Create$1({ auth, users, projects }) {
    const { data, setData, post, errors, reset } = useForm({
        "name": "",
        "image": "",
        "description": "",
        "due_date": "",
        "status": "",
        "priority": "",
        "assigned_user_id": "",
        "project_id": ""
    });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("tasks.store"), data);
    };
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Create Task" }),
        /* @__PURE__ */ jsx(
                    Link,
                    {
                        href: route("tasks.index"),
                        className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                        children: "Back"
                    }
                )
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Tasks - Create" }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsx("div", {
                    className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("form", {
                            onSubmit, className: "p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "project", value: "Project" }),
            /* @__PURE__ */ jsx(
                                    SelectInput,
                                    {
                                        name: "project_id",
                                        id: "project",
                                        className: `block w-full mt-1 cursor-pointer ${errors.project_id ? "border-red-500" : ""}`,
                                        placeholder: "Select project",
                                        options: projects.data.map((project) => ({ value: project.id, label: project.name })),
                                        onChange: (selectedOption) => setData("project_id", selectedOption ? selectedOption.value : "")
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.project_id, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Task Name" }),
            /* @__PURE__ */ jsx(TextInput, { id: "name", type: "text", name: "name", value: data.name, className: "w-full mt-1 " + (errors.name ? "border-red-500" : ""), isFocused: true, onChange: (e) => setData("name", e.target.value) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "image", value: "Task Image" }),
            /* @__PURE__ */ jsx(
                                    TextInput,
                                    {
                                        id: "image",
                                        type: "file",
                                        name: "image",
                                        className: "w-full mt-1 form-input " + (errors.image ? "border-red-500" : ""),
                                        onChange: (e) => setData("image", e.target.files[0])
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.image, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "desc", value: "Task Description" }),
            /* @__PURE__ */ jsx(
                                    TextAreaInput,
                                    {
                                        id: "task_description",
                                        name: "description",
                                        value: data.description,
                                        className: "block w-full mt-1 " + (errors.description ? "border-red-500" : ""),
                                        onChange: (e) => setData("description", e.target.value)
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "task_priority", value: "Task Priority" }),
            /* @__PURE__ */ jsx(
                                    SelectInput,
                                    {
                                        name: "priority",
                                        id: "task_priority",
                                        placeholder: "Select Priority",
                                        className: `block w-full mt-1 cursor-pointer ${errors.priority ? "border-red-500" : ""}`,
                                        options: Object.entries(TASK_PRIORITY_TEXT_MAP).map(([priority, text]) => ({
                                            value: priority,
                                            label: text
                                        })),
                                        onChange: (selectedOption) => setData("priority", selectedOption ? selectedOption.value : "")
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.priority, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "assigned_user", value: "Assigned User" }),
            /* @__PURE__ */ jsx(
                                    SelectInput,
                                    {
                                        name: "assigned_user_id",
                                        id: "assigned_user",
                                        placeholder: "Select User",
                                        className: `block w-full mt-1 cursor-pointer ${errors.assigned_user_id ? "border-red-500" : ""}`,
                                        options: users.data.map((user) => ({ value: user.id, label: user.name })),
                                        onChange: (selectedOption) => setData("assigned_user_id", selectedOption ? selectedOption.value : "")
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.assigned_user_id, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "task_status", value: "Task Status" }),
            /* @__PURE__ */ jsx(
                                    SelectInput,
                                    {
                                        name: "status",
                                        id: "task_status",
                                        placeholder: "Select Status",
                                        className: `block w-full mt-1 cursor-pointer ${errors.status ? "border-red-500" : ""}`,
                                        options: Object.entries(TASK_STATUS_TEXT_MAP).map(([status, text]) => ({
                                            value: status,
                                            label: text
                                        })),
                                        onChange: (selectedOption) => setData("status", selectedOption ? selectedOption.value : "")
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "due_date", value: "Task Deadline" }),
            /* @__PURE__ */ jsx(TextInput, { id: "due_date", type: "date", name: "due_date", value: data.due_date, className: "w-full mt-1 " + (errors.due_date ? "border-red-500" : ""), onChange: (e) => setData("due_date", e.target.value) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.due_date, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4 text-right", children: [
            /* @__PURE__ */ jsx(
                                    Link,
                                    {
                                        href: route("tasks.index"),
                                        className: "px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200",
                                        children: "Cancel"
                                    }
                                ),
            /* @__PURE__ */ jsx("button", { type: "submit", className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600", children: "Submit" })
                                ]
                            })
                            ]
                        })
                    })
                })
            })
            ]
        }
    );
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Create$1
}, Symbol.toStringTag, { value: "Module" }));
function Edit$1({ auth, task, projects, users }) {
    const { data, setData, errors, reset, post } = useForm({
        "name": task.name || "",
        "description": task.description || "",
        "status": task.status || "",
        "due_date": task.due_date || "",
        "image": "",
        "priority": task.priority || "",
        "assigned_user_id": task.assigned_user.id || null,
        "project_id": task.project.id || null,
        "_method": "PUT"
    });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("tasks.update", task.id), data);
    };
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("h2", {
                    className: "text-xl font-semibold leading-tight text-gray-800", children: [
                        'Edit Task "',
                        task.name,
                        '"'
                    ]
                }),
        /* @__PURE__ */ jsx(
                    Link,
                    {
                        href: route("tasks.index"),
                        className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                        children: "Back"
                    }
                )
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Tasks - Edit" }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsx("div", {
                    className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("form", {
                            onSubmit, className: "p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg", children: [
                                task.image_path && /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("img", { src: task.image_path, className: "w-64" }) }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "project", value: "Project" }),
            /* @__PURE__ */ jsx(
                                        SelectInput,
                                        {
                                            name: "project_id",
                                            id: "project",
                                            className: `block w-full mt-1 cursor-pointer ${errors.project_id ? "border-red-500" : ""}`,
                                            placeholder: "Select project",
                                            defaultValue: data.project_id,
                                            options: projects.data.map((project) => ({ value: project.id, label: project.name })),
                                            onChange: (selectedOption) => setData("project_id", selectedOption ? selectedOption.value : "")
                                        }
                                    ),
            /* @__PURE__ */ jsx(InputError, { message: errors.project_id, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Task Name" }),
            /* @__PURE__ */ jsx(TextInput, { id: "name", type: "text", name: "name", value: data.name, className: "w-full mt-1 " + (errors.name ? "border-red-500" : ""), isFocused: true, onChange: (e) => setData("name", e.target.value) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "image", value: "Task Image" }),
            /* @__PURE__ */ jsx(
                                        TextInput,
                                        {
                                            id: "image",
                                            type: "file",
                                            name: "image",
                                            className: "w-full mt-1 form-input " + (errors.image ? "border-red-500" : ""),
                                            onChange: (e) => setData("image", e.target.files[0])
                                        }
                                    ),
            /* @__PURE__ */ jsx(InputError, { message: errors.image, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "desc", value: "Task Description" }),
            /* @__PURE__ */ jsx(
                                        TextAreaInput,
                                        {
                                            id: "task_description",
                                            name: "description",
                                            value: data.description,
                                            className: "block w-full mt-1 " + (errors.description ? "border-red-500" : ""),
                                            onChange: (e) => setData("description", e.target.value)
                                        }
                                    ),
            /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "task_priority", value: "Task Priority" }),
            /* @__PURE__ */ jsx(
                                        SelectInput,
                                        {
                                            name: "priority",
                                            id: "task_priority",
                                            placeholder: "Select Priority",
                                            defaultValue: data.priority,
                                            className: `block w-full mt-1 cursor-pointer ${errors.priority ? "border-red-500" : ""}`,
                                            options: Object.entries(TASK_PRIORITY_TEXT_MAP).map(([priority, text]) => ({
                                                value: priority,
                                                label: text
                                            })),
                                            onChange: (selectedOption) => setData("priority", selectedOption ? selectedOption.value : "")
                                        }
                                    ),
            /* @__PURE__ */ jsx(InputError, { message: errors.priority, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "assigned_user", value: "Assigned User" }),
            /* @__PURE__ */ jsx(
                                        SelectInput,
                                        {
                                            name: "assigned_user_id",
                                            id: "assigned_user",
                                            placeholder: "Select User",
                                            defaultValue: data.assigned_user_id,
                                            className: `block w-full mt-1 cursor-pointer ${errors.assigned_user_id ? "border-red-500" : ""}`,
                                            options: users.data.map((user) => ({ value: user.id, label: user.name })),
                                            onChange: (selectedOption) => setData("assigned_user_id", selectedOption ? selectedOption.value : "")
                                        }
                                    ),
            /* @__PURE__ */ jsx(InputError, { message: errors.assigned_user_id, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "task_status", value: "Task Status" }),
            /* @__PURE__ */ jsx(
                                        SelectInput,
                                        {
                                            name: "status",
                                            id: "task_status",
                                            className: `block w-full mt-1 cursor-pointer ${errors.status ? "border-red-500" : ""}`,
                                            options: Object.entries(TASK_STATUS_TEXT_MAP).map(([status, text]) => ({
                                                value: status,
                                                label: text
                                            })),
                                            defaultValue: data.status,
                                            onChange: (selectedOption) => setData("status", selectedOption ? selectedOption.value : "")
                                        }
                                    ),
            /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "due_date", value: "Task Due Date" }),
            /* @__PURE__ */ jsx(TextInput, { id: "due_date", type: "date", name: "due_date", value: data.due_date, className: "w-full mt-1 " + (errors.due_date ? "border-red-500" : ""), onChange: (e) => setData("due_date", e.target.value) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.due_date, className: "mt-2" })
                                    ]
                                }),
          /* @__PURE__ */ jsxs("div", {
                                    className: "mt-4 text-right", children: [
            /* @__PURE__ */ jsx(
                                        Link,
                                        {
                                            href: route("tasks.index"),
                                            className: "px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200",
                                            children: "Cancel"
                                        }
                                    ),
            /* @__PURE__ */ jsx("button", { type: "submit", className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600", children: "Submit" })
                                    ]
                                })
                            ]
                        })
                    })
                })
            })
            ]
        }
    );
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Edit$1
}, Symbol.toStringTag, { value: "Module" }));
function Index$1({ auth, tasks, queryParams = null }) {
    queryParams = queryParams || {};
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Tasks" }),
        /* @__PURE__ */ jsx(
                    Link,
                    {
                        href: route("tasks.create"),
                        className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                        children: "Add new"
                    }
                )
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Tasks" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx(TasksTable, { tasks, queryParams }) }) })
            ]
        }
    );
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
function Show$1({ auth, task, tasks, queryParams }) {
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("h2", {
                    className: "text-xl font-semibold leading-tight text-gray-800", children: [
                        "Task - ",
                        task.name
                    ]
                }),
        /* @__PURE__ */ jsxs("div", {
                    children: [
          /* @__PURE__ */ jsx(
                        Link,
                        {
                            href: route("tasks.edit", task.id),
                            className: "px-3 py-1 mx-2 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                            children: "Edit"
                        }
                    ),
          /* @__PURE__ */ jsx(
                        Link,
                        {
                            href: route("tasks.index"),
                            className: "px-3 py-1 mx-2 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                            children: "Back"
                        }
                    )
                    ]
                })
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: `Task - ${task.name}` }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsx("div", {
                    className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", {
                        className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg", children: [
          /* @__PURE__ */ jsx("div", {
                            children: /* @__PURE__ */ jsx(
                                "img",
                                {
                                    src: task.image_path,
                                    alt: "",
                                    className: "object-cover w-full h-64"
                                }
                            )
                        }),
          /* @__PURE__ */ jsxs("div", {
                            className: "p-6 text-gray-900 dark:text-gray-100", children: [
            /* @__PURE__ */ jsxs("div", {
                                className: "grid grid-cols-2 gap-1 mt-2", children: [
              /* @__PURE__ */ jsxs("div", {
                                    children: [
                /* @__PURE__ */ jsxs("div", {
                                        children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Task ID" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: task.id })
                                        ]
                                    }),
                /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Task Name" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: task.name })
                                        ]
                                    }),
                /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Task Status" }),
                  /* @__PURE__ */ jsx("p", {
                                            className: "mt-1", children: /* @__PURE__ */ jsx(
                                                "span",
                                                {
                                                    className: "px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status],
                                                    children: TASK_STATUS_TEXT_MAP[task.status]
                                                }
                                            )
                                        })
                                        ]
                                    }),
                /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Created By" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: task.created_by.name })
                                        ]
                                    })
                                    ]
                                }),
              /* @__PURE__ */ jsxs("div", {
                                    children: [
                /* @__PURE__ */ jsxs("div", {
                                        children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Due Date" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: task.due_date })
                                        ]
                                    }),
                /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Create Date" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: task.created_at })
                                        ]
                                    }),
                /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Updated By" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: task.updated_by.name })
                                        ]
                                    })
                                    ]
                                })
                                ]
                            }),
            /* @__PURE__ */ jsxs("div", {
                                className: "mt-4", children: [
              /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Task Description" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1", children: task.description })
                                ]
                            })
                            ]
                        })
                        ]
                    })
                })
            })
            ]
        }
    );
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Show$1
}, Symbol.toStringTag, { value: "Module" }));
function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        "name": "",
        "email": "",
        "password": "",
        "password_confirmation": ""
    });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("users.store"), data);
    };
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Create User" }),
        /* @__PURE__ */ jsx(
                    Link,
                    {
                        href: route("users.index"),
                        className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                        children: "Back"
                    }
                )
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Users - Create" }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsx("div", {
                    className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("form", {
                            onSubmit, className: "p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "User Name" }),
            /* @__PURE__ */ jsx(TextInput, { id: "name", type: "text", isFocused: true, name: "name", value: data.name, className: "w-full mt-1 " + (errors.name ? "border-red-500" : ""), isFocused: true, onChange: (e) => setData("name", e.target.value) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "User Email" }),
            /* @__PURE__ */ jsx(
                                    TextInput,
                                    {
                                        id: "email",
                                        type: "email",
                                        name: "email",
                                        className: "w-full mt-1 form-input " + (errors.email ? "border-red-500" : ""),
                                        onChange: (e) => setData("email", e.target.value)
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "desc", value: "Password" }),
            /* @__PURE__ */ jsx(
                                    TextInput,
                                    {
                                        id: "password",
                                        type: "password",
                                        name: "password",
                                        className: "w-full mt-1 form-input " + (errors.password ? "border-red-500" : ""),
                                        onChange: (e) => setData("password", e.target.value)
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "user_status", value: "Password Confirmation" }),
            /* @__PURE__ */ jsx(
                                    TextInput,
                                    {
                                        id: "password_confirmation",
                                        type: "password",
                                        name: "password_confirmation",
                                        className: "w-full mt-1 form-input " + (errors.password_confirmation ? "border-red-500" : ""),
                                        onChange: (e) => setData("password_confirmation", e.target.value)
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4 text-right", children: [
            /* @__PURE__ */ jsx(
                                    Link,
                                    {
                                        href: route("users.index"),
                                        className: "px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200",
                                        children: "Cancel"
                                    }
                                ),
            /* @__PURE__ */ jsx("button", { type: "submit", className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600", children: "Submit" })
                                ]
                            })
                            ]
                        })
                    })
                })
            })
            ]
        }
    );
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Create
}, Symbol.toStringTag, { value: "Module" }));
function Edit({ auth, user }) {
    const { data, setData, errors, reset, post } = useForm({
        "name": user.name || "",
        "email": user.email || "",
        "password": "",
        "password_confirmation": "",
        "_method": "PUT"
    });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("users.update", user.id), data);
    };
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("h2", {
                    className: "text-xl font-semibold leading-tight text-gray-800", children: [
                        'Edit User "',
                        user.name,
                        '"'
                    ]
                }),
        /* @__PURE__ */ jsx(
                    Link,
                    {
                        href: route("users.index"),
                        className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                        children: "Back"
                    }
                )
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Users - Edit" }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsx("div", {
                    className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("form", {
                            onSubmit, className: "p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "User Name" }),
            /* @__PURE__ */ jsx(TextInput, { id: "name", type: "text", isFocused: true, name: "name", value: data.name, className: "w-full mt-1 " + (errors.name ? "border-red-500" : ""), isFocused: true, onChange: (e) => setData("name", e.target.value) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "User Email" }),
            /* @__PURE__ */ jsx(
                                    TextInput,
                                    {
                                        id: "email",
                                        type: "email",
                                        name: "email",
                                        value: data.email,
                                        className: "w-full mt-1 form-input " + (errors.email ? "border-red-500" : ""),
                                        onChange: (e) => setData("email", e.target.value)
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "desc", value: "Password" }),
            /* @__PURE__ */ jsx(
                                    TextInput,
                                    {
                                        id: "password",
                                        type: "password",
                                        name: "password",
                                        className: "w-full mt-1 form-input " + (errors.password ? "border-red-500" : ""),
                                        onChange: (e) => setData("password", e.target.value)
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "user_status", value: "Password Confirmation" }),
            /* @__PURE__ */ jsx(
                                    TextInput,
                                    {
                                        id: "password_confirmation",
                                        type: "password",
                                        name: "password_confirmation",
                                        className: "w-full mt-1 form-input " + (errors.password_confirmation ? "border-red-500" : ""),
                                        onChange: (e) => setData("password_confirmation", e.target.value)
                                    }
                                ),
            /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
                                ]
                            }),
          /* @__PURE__ */ jsxs("div", {
                                className: "mt-4 text-right", children: [
            /* @__PURE__ */ jsx(
                                    Link,
                                    {
                                        href: route("users.index"),
                                        className: "px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200",
                                        children: "Cancel"
                                    }
                                ),
            /* @__PURE__ */ jsx("button", { type: "submit", className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600", children: "Submit" })
                                ]
                            })
                            ]
                        })
                    })
                })
            })
            ]
        }
    );
}
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Edit
}, Symbol.toStringTag, { value: "Module" }));
function Index({ auth, sessionParams, users, queryParams = null, session = null }) {
    sessionParams = sessionParams || {};
    queryParams = queryParams || {};
    const sortByField = queryParams.sortBy || "created_at";
    const sortDir = queryParams.sortDir || "DESC";
    const searchFieldChanged = async (name, value) => {
        console.log("Search field changed :" + name + " -> " + value);
        if (name == "submit" && value == "submit") {
            router.get(route("users.index"), queryParams);
            return;
        } else if (name == "clear" && value == "clear") {
            if ((queryParams == null ? void 0 : queryParams.page) && queryParams.page > 0) {
                router.get(route("users.index"), { page: queryParams.page });
                return;
            }
            queryParams = {};
            router.get(route("users.index"));
            return;
        } else if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("users.index", queryParams));
    };
    const onKeyPress = async (name, e) => {
        if (e.key == "Enter") {
            searchFieldChanged(name, e.target.value);
        }
    };
    const sortBy = async (name) => {
        if (name == queryParams.sortBy) {
            queryParams.sortDir = queryParams.sortDir == "ASC" ? "DESC" : "ASC";
        } else {
            queryParams.sortBy = name;
            queryParams.sortDir = "ASC";
        }
        router.get(route("users.index", queryParams));
    };
    const deleteUser = (user) => {
        if (confirm("Are you sure you want to delete this user?")) {
            console.log(`deleting user : ${user.id}`);
            router.delete(route("users.destroy", user.id));
        }
    };
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Users" }),
        /* @__PURE__ */ jsx(
                    Link,
                    {
                        href: route("users.create"),
                        className: "px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                        children: "Add new"
                    }
                )
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: "Users" }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsx("div", {
                    className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", {
                        className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", {
                            className: "flex flex-col items-center justify-between gap-4 p-6 mb-6 bg-white rounded-lg shadow-md sm:flex-row dark:bg-gray-800", children: [
            /* @__PURE__ */ jsxs("div", {
                                className: "flex items-center w-full sm:w-auto", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "search", className: "sr-only", children: "Search" }),
              /* @__PURE__ */ jsx(
                                    TextInput,
                                    {
                                        type: "text",
                                        id: "search",
                                        placeholder: "Search ...",
                                        defaultValue: queryParams.search,
                                        className: "block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500",
                                        onBlur: (e) => searchFieldChanged("search", e.target.value),
                                        onKeyPress: (e) => onKeyPress("search", e)
                                    }
                                )
                                ]
                            }),
            /* @__PURE__ */ jsxs("div", {
                                className: "flex items-center w-full gap-4 sm:w-auto", children: [
              /* @__PURE__ */ jsxs("div", {
                                    children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "from-date", className: "sr-only", children: "From Date" }),
                /* @__PURE__ */ jsx(
                                        TextInput,
                                        {
                                            type: "date",
                                            id: "from-date",
                                            placeholder: "Search by name...",
                                            defaultValue: queryParams.from_date,
                                            className: "block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500",
                                            onBlur: (e) => searchFieldChanged("from_date", e.target.value),
                                            onKeyPress: (e) => onKeyPress("from_date", e)
                                        }
                                    )
                                    ]
                                }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "To" }),
              /* @__PURE__ */ jsxs("div", {
                                    children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "to-date", className: "sr-only", children: "To Date" }),
                /* @__PURE__ */ jsx(
                                        TextInput,
                                        {
                                            type: "date",
                                            id: "to-date",
                                            placeholder: "Search by name...",
                                            defaultValue: queryParams.to_date,
                                            className: "block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500",
                                            onBlur: (e) => searchFieldChanged("to_date", e.target.value),
                                            onKeyPress: (e) => onKeyPress("to_date", e)
                                        }
                                    )
                                    ]
                                })
                                ]
                            }),
            /* @__PURE__ */ jsx(
                                Button$1,
                                {
                                    className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800",
                                    onClick: (e) => searchFieldChanged("submit", "submit"),
                                    children: "Search"
                                }
                            ),
                                queryParams.search || queryParams.from_date || queryParams.to_date ? /* @__PURE__ */ jsx(
                                    Button$1,
                                    {
                                        className: "px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800",
                                        onClick: (e) => searchFieldChanged("clear", "clear"),
                                        children: "Clear Search"
                                    }
                                ) : null
                            ]
                        }),
          /* @__PURE__ */ jsxs("div", {
                            className: "relative overflow-x-auto shadow-md sm:rounded-lg", children: [
            /* @__PURE__ */ jsxs("table", {
                                className: "w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400", children: [
              /* @__PURE__ */ jsx("thead", {
                                    className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400", children: /* @__PURE__ */ jsxs("tr", {
                                        children: [
                /* @__PURE__ */ jsx(TableHeading, { sortable: false, children: "Sr. No" }),
                /* @__PURE__ */ jsx(TableHeading, { onClick: () => sortBy("name"), sortByField, currentField: "name", sortDir, children: "Name" }),
                /* @__PURE__ */ jsx(TableHeading, { onClick: () => sortBy("email"), sortByField, currentField: "email", sortDir, children: "Email" }),
                /* @__PURE__ */ jsx(TableHeading, { onClick: () => sortBy("created_at"), sortByField, currentField: "created_at", sortDir, children: "Created At" }),
                /* @__PURE__ */ jsx(TableHeading, { sortable: false, className: "text-right", children: "Actions" })
                                        ]
                                    })
                                }),
              /* @__PURE__ */ jsx("tbody", {
                                    children: users.data.map((user, index) => /* @__PURE__ */ jsxs("tr", {
                                        className: "bg-white border-b dark:bg-gray-800 dark:border-gray-700", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: index + 1 }),
                /* @__PURE__ */ jsx("th", { scope: "row", className: "px-6 py-4 font-medium text-gray-900 hover:underline whitespace-nowrap dark:text-white", children: /* @__PURE__ */ jsx(Link, { href: route("users.show", user.id), children: user.name }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: user.email }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: user.created_at }),
                /* @__PURE__ */ jsxs("td", {
                                            className: "px-6 py-4 text-nowrap", children: [
                  /* @__PURE__ */ jsx(Link, { href: route("users.edit", { user: user.id }), className: "mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline", children: "Edit" }),
                  /* @__PURE__ */ jsx(Link, { onClick: (e) => deleteUser(user), className: "mx-1 font-medium text-red-600 dark:text-red-500 hover:underline", children: "Delete" })
                                            ]
                                        })
                                        ]
                                    }, user.id))
                                })
                                ]
                            }),
            /* @__PURE__ */ jsx(Pagination, { Links: users.meta.links, className: "mx-auto", queryParams })
                            ]
                        })
                        ]
                    })
                })
            })
            ]
        }
    );
}
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Index
}, Symbol.toStringTag, { value: "Module" }));
function Show({ auth, user, queryParams }) {
    return /* @__PURE__ */ jsxs(
        AuthenticatedLayout,
        {
            user: auth.user,
            header: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("h2", {
                    className: "text-xl font-semibold leading-tight text-gray-800", children: [
                        "User - ",
                        user.name
                    ]
                }),
        /* @__PURE__ */ jsxs("div", {
                    children: [
          /* @__PURE__ */ jsx(
                        Link,
                        {
                            href: route("users.edit", user.id),
                            className: "px-3 py-1 mx-2 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                            children: "Edit"
                        }
                    ),
          /* @__PURE__ */ jsx(
                        Link,
                        {
                            href: route("users.index"),
                            className: "px-3 py-1 mx-2 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600",
                            children: "Back"
                        }
                    )
                    ]
                })
                ]
            }),
            children: [
        /* @__PURE__ */ jsx(Head, { title: `User - ${user.name}` }),
        /* @__PURE__ */ jsx("div", {
                className: "py-12", children: /* @__PURE__ */ jsx("div", {
                    className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", {
                        className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg", children: /* @__PURE__ */ jsx("div", {
                            className: "p-6 text-gray-900 dark:text-gray-100", children: /* @__PURE__ */ jsxs("div", {
                                className: "grid grid-cols-2 gap-1 mt-2", children: [
          /* @__PURE__ */ jsxs("div", {
                                    children: [
            /* @__PURE__ */ jsxs("div", {
                                        children: [
              /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "User ID" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1", children: user.id })
                                        ]
                                    }),
            /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
              /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "User Name" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1", children: user.name })
                                        ]
                                    })
                                    ]
                                }),
          /* @__PURE__ */ jsx("div", {
                                    children: /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
            /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Create Date" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1", children: user.created_at })
                                        ]
                                    })
                                }),
          /* @__PURE__ */ jsx("div", {
                                    children: /* @__PURE__ */ jsxs("div", {
                                        className: "mt-4", children: [
            /* @__PURE__ */ jsx("label", { className: "text-lg font-bold", children: "Email Verified At" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1", children: user.email_verified_at })
                                        ]
                                    })
                                })
                                ]
                            })
                        })
                    })
                })
            })
            ]
        }
    );
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Show
}, Symbol.toStringTag, { value: "Module" }));
function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        var _a, _b, _c, _d;
        (_a = document.getElementById("screenshot-container")) == null ? void 0 : _a.classList.add("!hidden");
        (_b = document.getElementById("docs-card")) == null ? void 0 : _b.classList.add("!row-span-1");
        (_c = document.getElementById("docs-card-content")) == null ? void 0 : _c.classList.add("!flex-row");
        (_d = document.getElementById("background")) == null ? void 0 : _d.classList.add("!hidden");
    };
    return /* @__PURE__ */ jsxs(Fragment, {
        children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsxs("div", {
            className: "bg-gray-50 text-black/50 dark:bg-black dark:text-white/50", children: [
      /* @__PURE__ */ jsx(
                "img",
                {
                    id: "background",
                    className: "absolute -left-20 top-0 max-w-[877px]",
                    src: "https://laravel.com/assets/img/welcome/background.svg"
                }
            ),
      /* @__PURE__ */ jsx("div", {
                className: "relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white", children: /* @__PURE__ */ jsxs("div", {
                    className: "relative w-full max-w-2xl px-6 lg:max-w-7xl", children: [
        /* @__PURE__ */ jsxs("header", {
                        className: "grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsx("div", {
                            className: "flex lg:col-start-2 lg:justify-center", children: /* @__PURE__ */ jsx(
                                "svg",
                                {
                                    className: "h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]",
                                    viewBox: "0 0 62 65",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /* @__PURE__ */ jsx(
                                        "path",
                                        {
                                            d: "M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z",
                                            fill: "currentColor"
                                        }
                                    )
                                }
                            )
                        }),
          /* @__PURE__ */ jsx("nav", {
                            className: "-mx-3 flex flex-1 justify-end", children: auth.user ? /* @__PURE__ */ jsx(
                                Link,
                                {
                                    href: route("dashboard"),
                                    className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                                    children: "Dashboard"
                                }
                            ) : /* @__PURE__ */ jsxs(Fragment, {
                                children: [
            /* @__PURE__ */ jsx(
                                    Link,
                                    {
                                        href: route("login"),
                                        className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                                        children: "Log in"
                                    }
                                ),
            /* @__PURE__ */ jsx(
                                    Link,
                                    {
                                        href: route("register"),
                                        className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                                        children: "Register"
                                    }
                                )
                                ]
                            })
                        })
                        ]
                    }),
        /* @__PURE__ */ jsx("main", {
                        className: "mt-6", children: /* @__PURE__ */ jsxs("div", {
                            className: "grid gap-6 lg:grid-cols-2 lg:gap-8", children: [
          /* @__PURE__ */ jsxs(
                                "a",
                                {
                                    href: "https://laravel.com/docs",
                                    id: "docs-card",
                                    className: "flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
                                    children: [
                /* @__PURE__ */ jsxs(
                                        "div",
                                        {
                                            id: "screenshot-container",
                                            className: "relative flex w-full flex-1 items-stretch",
                                            children: [
                      /* @__PURE__ */ jsx(
                                                "img",
                                                {
                                                    src: "https://laravel.com/assets/img/welcome/docs-light.svg",
                                                    alt: "Laravel documentation screenshot",
                                                    className: "aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.06)] dark:hidden",
                                                    onError: handleImageError
                                                }
                                            ),
                      /* @__PURE__ */ jsx(
                                                "img",
                                                {
                                                    src: "https://laravel.com/assets/img/welcome/docs-dark.svg",
                                                    alt: "Laravel documentation screenshot",
                                                    className: "hidden aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.25)] dark:block"
                                                }
                                            ),
                      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)] bg-gradient-to-b from-transparent via-white to-white dark:via-zinc-900 dark:to-zinc-900" })
                                            ]
                                        }
                                    ),
                /* @__PURE__ */ jsxs("div", {
                                        className: "relative flex items-center gap-6 lg:items-end", children: [
                  /* @__PURE__ */ jsxs(
                                            "div",
                                            {
                                                id: "docs-card-content",
                                                className: "flex items-start gap-6 lg:flex-col",
                                                children: [
                        /* @__PURE__ */ jsx("div", {
                                                    className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsxs(
                                                        "svg",
                                                        {
                                                            className: "size-5 sm:size-6",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            children: [
                              /* @__PURE__ */ jsx(
                                                                "path",
                                                                {
                                                                    fill: "#FF2D20",
                                                                    d: "M23 4a1 1 0 0 0-1.447-.894L12.224 7.77a.5.5 0 0 1-.448 0L2.447 3.106A1 1 0 0 0 1 4v13.382a1.99 1.99 0 0 0 1.105 1.79l9.448 4.728c.14.065.293.1.447.1.154-.005.306-.04.447-.105l9.453-4.724a1.99 1.99 0 0 0 1.1-1.789V4ZM3 6.023a.25.25 0 0 1 .362-.223l7.5 3.75a.251.251 0 0 1 .138.223v11.2a.25.25 0 0 1-.362.224l-7.5-3.75a.25.25 0 0 1-.138-.22V6.023Zm18 11.2a.25.25 0 0 1-.138.224l-7.5 3.75a.249.249 0 0 1-.329-.099.249.249 0 0 1-.033-.12V9.772a.251.251 0 0 1 .138-.224l7.5-3.75a.25.25 0 0 1 .362.224v11.2Z"
                                                                }
                                                            ),
                              /* @__PURE__ */ jsx(
                                                                "path",
                                                                {
                                                                    fill: "#FF2D20",
                                                                    d: "m3.55 1.893 8 4.048a1.008 1.008 0 0 0 .9 0l8-4.048a1 1 0 0 0-.9-1.785l-7.322 3.706a.506.506 0 0 1-.452 0L4.454.108a1 1 0 0 0-.9 1.785H3.55Z"
                                                                }
                                                            )
                                                            ]
                                                        }
                                                    )
                                                }),
                        /* @__PURE__ */ jsxs("div", {
                                                    className: "pt-3 sm:pt-5 lg:pt-0", children: [
                          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Documentation" }),
                          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laravel has wonderful documentation covering every aspect of the framework. Whether you are a newcomer or have prior experience with Laravel, we recommend reading our documentation from beginning to end." })
                                                    ]
                                                })
                                                ]
                                            }
                                        ),
                  /* @__PURE__ */ jsx(
                                            "svg",
                                            {
                                                className: "size-6 shrink-0 stroke-[#FF2D20]",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                strokeWidth: "1.5",
                                                children: /* @__PURE__ */ jsx(
                                                    "path",
                                                    {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                                    }
                                                )
                                            }
                                        )
                                        ]
                                    })
                                    ]
                                }
                            ),
          /* @__PURE__ */ jsxs(
                                "a",
                                {
                                    href: "https://laracasts.com",
                                    className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
                                    children: [
                /* @__PURE__ */ jsx("div", {
                                        className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                                            "svg",
                                            {
                                                className: "size-5 sm:size-6",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                children: /* @__PURE__ */ jsx("g", { fill: "#FF2D20", children: /* @__PURE__ */ jsx("path", { d: "M24 8.25a.5.5 0 0 0-.5-.5H.5a.5.5 0 0 0-.5.5v12a2.5 2.5 0 0 0 2.5 2.5h19a2.5 2.5 0 0 0 2.5-2.5v-12Zm-7.765 5.868a1.221 1.221 0 0 1 0 2.264l-6.626 2.776A1.153 1.153 0 0 1 8 18.123v-5.746a1.151 1.151 0 0 1 1.609-1.035l6.626 2.776ZM19.564 1.677a.25.25 0 0 0-.177-.427H15.6a.106.106 0 0 0-.072.03l-4.54 4.543a.25.25 0 0 0 .177.427h3.783c.027 0 .054-.01.073-.03l4.543-4.543ZM22.071 1.318a.047.047 0 0 0-.045.013l-4.492 4.492a.249.249 0 0 0 .038.385.25.25 0 0 0 .14.042h5.784a.5.5 0 0 0 .5-.5v-2a2.5 2.5 0 0 0-1.925-2.432ZM13.014 1.677a.25.25 0 0 0-.178-.427H9.101a.106.106 0 0 0-.073.03l-4.54 4.543a.25.25 0 0 0 .177.427H8.4a.106.106 0 0 0 .073-.03l4.54-4.543ZM6.513 1.677a.25.25 0 0 0-.177-.427H2.5A2.5 2.5 0 0 0 0 3.75v2a.5.5 0 0 0 .5.5h1.4a.106.106 0 0 0 .073-.03l4.54-4.543Z" }) })
                                            }
                                        )
                                    }),
                /* @__PURE__ */ jsxs("div", {
                                        className: "pt-3 sm:pt-5", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Laracasts" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see for yourself, and massively level up your development skills in the process." })
                                        ]
                                    }),
                /* @__PURE__ */ jsx(
                                        "svg",
                                        {
                                            className: "size-6 shrink-0 self-center stroke-[#FF2D20]",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            strokeWidth: "1.5",
                                            children: /* @__PURE__ */ jsx(
                                                "path",
                                                {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                                }
                                            )
                                        }
                                    )
                                    ]
                                }
                            ),
          /* @__PURE__ */ jsxs(
                                "a",
                                {
                                    href: "https://laravel-news.com",
                                    className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
                                    children: [
                /* @__PURE__ */ jsx("div", {
                                        className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                                            "svg",
                                            {
                                                className: "size-5 sm:size-6",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                children: /* @__PURE__ */ jsxs("g", {
                                                    fill: "#FF2D20", children: [
                      /* @__PURE__ */ jsx("path", { d: "M8.75 4.5H5.5c-.69 0-1.25.56-1.25 1.25v4.75c0 .69.56 1.25 1.25 1.25h3.25c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25Z" }),
                      /* @__PURE__ */ jsx("path", { d: "M24 10a3 3 0 0 0-3-3h-2V2.5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2V20a3.5 3.5 0 0 0 3.5 3.5h17A3.5 3.5 0 0 0 24 20V10ZM3.5 21.5A1.5 1.5 0 0 1 2 20V3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v17c0 .295.037.588.11.874a.5.5 0 0 1-.484.625L3.5 21.5ZM22 20a1.5 1.5 0 1 1-3 0V9.5a.5.5 0 0 1 .5-.5H21a1 1 0 0 1 1 1v10Z" }),
                      /* @__PURE__ */ jsx("path", { d: "M12.751 6.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 7.3v-.5a.75.75 0 0 1 .751-.753ZM12.751 10.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 11.3v-.5a.75.75 0 0 1 .751-.753ZM4.751 14.047h10a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-10A.75.75 0 0 1 4 15.3v-.5a.75.75 0 0 1 .751-.753ZM4.75 18.047h7.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-7.5A.75.75 0 0 1 4 19.3v-.5a.75.75 0 0 1 .75-.753Z" })
                                                    ]
                                                })
                                            }
                                        )
                                    }),
                /* @__PURE__ */ jsxs("div", {
                                        className: "pt-3 sm:pt-5", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Laravel News" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laravel News is a community driven portal and newsletter aggregating all of the latest and most important news in the Laravel ecosystem, including new package releases and tutorials." })
                                        ]
                                    }),
                /* @__PURE__ */ jsx(
                                        "svg",
                                        {
                                            className: "size-6 shrink-0 self-center stroke-[#FF2D20]",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            strokeWidth: "1.5",
                                            children: /* @__PURE__ */ jsx(
                                                "path",
                                                {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                                }
                                            )
                                        }
                                    )
                                    ]
                                }
                            ),
          /* @__PURE__ */ jsxs("div", {
                                className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800", children: [
            /* @__PURE__ */ jsx("div", {
                                    className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                                        "svg",
                                        {
                                            className: "size-5 sm:size-6",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            children: /* @__PURE__ */ jsx("g", { fill: "#FF2D20", children: /* @__PURE__ */ jsx("path", { d: "M16.597 12.635a.247.247 0 0 0-.08-.237 2.234 2.234 0 0 1-.769-1.68c.001-.195.03-.39.084-.578a.25.25 0 0 0-.09-.267 8.8 8.8 0 0 0-4.826-1.66.25.25 0 0 0-.268.181 2.5 2.5 0 0 1-2.4 1.824.045.045 0 0 0-.045.037 12.255 12.255 0 0 0-.093 3.86.251.251 0 0 0 .208.214c2.22.366 4.367 1.08 6.362 2.118a.252.252 0 0 0 .32-.079 10.09 10.09 0 0 0 1.597-3.733ZM13.616 17.968a.25.25 0 0 0-.063-.407A19.697 19.697 0 0 0 8.91 15.98a.25.25 0 0 0-.287.325c.151.455.334.898.548 1.328.437.827.981 1.594 1.619 2.28a.249.249 0 0 0 .32.044 29.13 29.13 0 0 0 2.506-1.99ZM6.303 14.105a.25.25 0 0 0 .265-.274 13.048 13.048 0 0 1 .205-4.045.062.062 0 0 0-.022-.07 2.5 2.5 0 0 1-.777-.982.25.25 0 0 0-.271-.149 11 11 0 0 0-5.6 2.815.255.255 0 0 0-.075.163c-.008.135-.02.27-.02.406.002.8.084 1.598.246 2.381a.25.25 0 0 0 .303.193 19.924 19.924 0 0 1 5.746-.438ZM9.228 20.914a.25.25 0 0 0 .1-.393 11.53 11.53 0 0 1-1.5-2.22 12.238 12.238 0 0 1-.91-2.465.248.248 0 0 0-.22-.187 18.876 18.876 0 0 0-5.69.33.249.249 0 0 0-.179.336c.838 2.142 2.272 4 4.132 5.353a.254.254 0 0 0 .15.048c1.41-.01 2.807-.282 4.117-.802ZM18.93 12.957l-.005-.008a.25.25 0 0 0-.268-.082 2.21 2.21 0 0 1-.41.081.25.25 0 0 0-.217.2c-.582 2.66-2.127 5.35-5.75 7.843a.248.248 0 0 0-.09.299.25.25 0 0 0 .065.091 28.703 28.703 0 0 0 2.662 2.12.246.246 0 0 0 .209.037c2.579-.701 4.85-2.242 6.456-4.378a.25.25 0 0 0 .048-.189 13.51 13.51 0 0 0-2.7-6.014ZM5.702 7.058a.254.254 0 0 0 .2-.165A2.488 2.488 0 0 1 7.98 5.245a.093.093 0 0 0 .078-.062 19.734 19.734 0 0 1 3.055-4.74.25.25 0 0 0-.21-.41 12.009 12.009 0 0 0-10.4 8.558.25.25 0 0 0 .373.281 12.912 12.912 0 0 1 4.826-1.814ZM10.773 22.052a.25.25 0 0 0-.28-.046c-.758.356-1.55.635-2.365.833a.25.25 0 0 0-.022.48c1.252.43 2.568.65 3.893.65.1 0 .2 0 .3-.008a.25.25 0 0 0 .147-.444c-.526-.424-1.1-.917-1.673-1.465ZM18.744 8.436a.249.249 0 0 0 .15.228 2.246 2.246 0 0 1 1.352 2.054c0 .337-.08.67-.23.972a.25.25 0 0 0 .042.28l.007.009a15.016 15.016 0 0 1 2.52 4.6.25.25 0 0 0 .37.132.25.25 0 0 0 .096-.114c.623-1.464.944-3.039.945-4.63a12.005 12.005 0 0 0-5.78-10.258.25.25 0 0 0-.373.274c.547 2.109.85 4.274.901 6.453ZM9.61 5.38a.25.25 0 0 0 .08.31c.34.24.616.561.8.935a.25.25 0 0 0 .3.127.631.631 0 0 1 .206-.034c2.054.078 4.036.772 5.69 1.991a.251.251 0 0 0 .267.024c.046-.024.093-.047.141-.067a.25.25 0 0 0 .151-.23A29.98 29.98 0 0 0 15.957.764a.25.25 0 0 0-.16-.164 11.924 11.924 0 0 0-2.21-.518.252.252 0 0 0-.215.076A22.456 22.456 0 0 0 9.61 5.38Z" }) })
                                        }
                                    )
                                }),
            /* @__PURE__ */ jsxs("div", {
                                    className: "pt-3 sm:pt-5", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Vibrant Ecosystem" }),
              /* @__PURE__ */ jsxs("p", {
                                        className: "mt-4 text-sm/relaxed", children: [
                                            "Laravel's robust library of first-party tools and libraries, such as",
                                            " ",
                /* @__PURE__ */ jsx(
                                                "a",
                                                {
                                                    href: "https://forge.laravel.com",
                                                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white dark:focus-visible:ring-[#FF2D20]",
                                                    children: "Forge"
                                                }
                                            ),
                                            ",",
                                            " ",
                /* @__PURE__ */ jsx(
                                                "a",
                                                {
                                                    href: "https://vapor.laravel.com",
                                                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                                                    children: "Vapor"
                                                }
                                            ),
                                            ",",
                                            " ",
                /* @__PURE__ */ jsx(
                                                "a",
                                                {
                                                    href: "https://nova.laravel.com",
                                                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                                                    children: "Nova"
                                                }
                                            ),
                                            ",",
                                            " ",
                /* @__PURE__ */ jsx(
                                                "a",
                                                {
                                                    href: "https://envoyer.io",
                                                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                                                    children: "Envoyer"
                                                }
                                            ),
                                            ", and",
                                            " ",
                /* @__PURE__ */ jsx(
                                                "a",
                                                {
                                                    href: "https://herd.laravel.com",
                                                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                                                    children: "Herd"
                                                }
                                            ),
                                            " ",
                                            "help you take your projects to the next level. Pair them with powerful open source libraries like",
                                            " ",
                /* @__PURE__ */ jsx(
                                                "a",
                                                {
                                                    href: "https://laravel.com/docs/billing",
                                                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                                                    children: "Cashier"
                                                }
                                            ),
                                            ",",
                                            " ",
                /* @__PURE__ */ jsx(
                                                "a",
                                                {
                                                    href: "https://laravel.com/docs/dusk",
                                                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                                                    children: "Dusk"
                                                }
                                            ),
                                            ",",
                                            " ",
                /* @__PURE__ */ jsx(
                                                "a",
                                                {
                                                    href: "https://laravel.com/docs/broadcasting",
                                                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                                                    children: "Echo"
                                                }
                                            ),
                                            ",",
                                            " ",
                /* @__PURE__ */ jsx(
                                                "a",
                                                {
                                                    href: "https://laravel.com/docs/horizon",
                                                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                                                    children: "Horizon"
                                                }
                                            ),
                                            ",",
                                            " ",
                /* @__PURE__ */ jsx(
                                                "a",
                                                {
                                                    href: "https://laravel.com/docs/sanctum",
                                                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                                                    children: "Sanctum"
                                                }
                                            ),
                                            ",",
                                            " ",
                /* @__PURE__ */ jsx(
                                                "a",
                                                {
                                                    href: "https://laravel.com/docs/telescope",
                                                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                                                    children: "Telescope"
                                                }
                                            ),
                                            ", and more."
                                        ]
                                    })
                                    ]
                                })
                                ]
                            })
                            ]
                        })
                    }),
        /* @__PURE__ */ jsxs("footer", {
                        className: "py-16 text-center text-sm text-black dark:text-white/70", children: [
                            "Laravel v",
                            laravelVersion,
                            " (PHP v",
                            phpVersion,
                            ")"
                        ]
                    })
                    ]
                })
            })
            ]
        })
        ]
    });
}
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
createServer(
    (page) => createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => {
            const pages = /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.jsx": __vite_glob_0_0, "./Pages/Auth/ForgotPassword.jsx": __vite_glob_0_1, "./Pages/Auth/Login.jsx": __vite_glob_0_2, "./Pages/Auth/Register.jsx": __vite_glob_0_3, "./Pages/Auth/ResetPassword.jsx": __vite_glob_0_4, "./Pages/Auth/VerifyEmail.jsx": __vite_glob_0_5, "./Pages/Chat/Create.jsx": __vite_glob_0_6, "./Pages/Chat/Index.jsx": __vite_glob_0_7, "./Pages/Chat/Room.jsx": __vite_glob_0_8, "./Pages/Dashboard.jsx": __vite_glob_0_9, "./Pages/Profile/Edit.jsx": __vite_glob_0_10, "./Pages/Profile/Partials/DeleteUserForm.jsx": __vite_glob_0_11, "./Pages/Profile/Partials/UpdatePasswordForm.jsx": __vite_glob_0_12, "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": __vite_glob_0_13, "./Pages/Profile/Partials/UpdateProfilePictureForm.jsx": __vite_glob_0_14, "./Pages/Projects/Create.jsx": __vite_glob_0_15, "./Pages/Projects/Edit.jsx": __vite_glob_0_16, "./Pages/Projects/Index.jsx": __vite_glob_0_17, "./Pages/Projects/Show.jsx": __vite_glob_0_18, "./Pages/Tasks/Create.jsx": __vite_glob_0_19, "./Pages/Tasks/Edit.jsx": __vite_glob_0_20, "./Pages/Tasks/Index.jsx": __vite_glob_0_21, "./Pages/Tasks/Show.jsx": __vite_glob_0_22, "./Pages/Tasks/TasksTable.jsx": __vite_glob_0_23, "./Pages/Users/Create.jsx": __vite_glob_0_24, "./Pages/Users/Edit.jsx": __vite_glob_0_25, "./Pages/Users/Index.jsx": __vite_glob_0_26, "./Pages/Users/Show.jsx": __vite_glob_0_27, "./Pages/Welcome.jsx": __vite_glob_0_28 });
            return pages[`./Pages/${name}.jsx`];
        },
        setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
    })
);
