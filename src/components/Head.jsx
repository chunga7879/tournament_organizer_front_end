import logo from '../images/hc_logo.png';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Head() {
    const[id, setid]=useState({});
    const [userID, setUserId] = useState("");
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState(false);

    useEffect(async() => {

        let name = "cat";
        let hash = window.location.hash;
        let id = new URL("https://example.com/?" + hash.substring(1)).searchParams.get('id_token');

        if (id !== null) {
            let base64Url = id.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

            id = JSON.parse(jsonPayload);
            document.cookie = name + "=" + (JSON.stringify(id)) + "; path=/";
        }

        let cookie =  null;

        let cookies = `; ${document.cookie}`;
        cookies = cookies.split(`; ${name}=`);
        if (cookies.length === 2) {
            cookie = cookies.pop().split(';').shift();
            cookie = JSON.parse(cookie);
        }

        if (cookie === null) {
            cookie = {
                "at_hash": "lol",
                "sub": "1111-222-33-44",
                "zoneinfo": "America/Vancouver",
                "email_verified": true,
                "iss": "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_3o4BQjDTT",
                "cognito:username": "haha",
                "picture": "https://this-person-does-not-exist.com/img/avatar-f2a8c8aacc8fdd5d5a3d4e07c1a94d03.jpg",
                "aud": "bits",
                "token_use": "id",
                "auth_time": 1647889971,
                "name": "Tmp User",
                "exp": 1647893571,
                "iat": 1647889971,
                "jti": "3a283a64-8ff5-4e2f-a832-deadbeafc0c0",
                "email": "no@exmpl.cool"
            };
            if (window.location.port !== "3000") {
                window.location = "https://hairless.auth.us-west-2.amazoncognito.com/login?client_id=4a4bitse8no8m5senvvbi2k41p&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fhairless.brycemw.ca%2F";
            }
        }

        setid(cookie);

        let response = await fetch(`https://backend.hairless.brycemw.ca/users/${cookie?.sub}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status !== 200) {
            let user = {
                "user_id": cookie.sub,
                "is_admin": window.location.port === "3000",
                "department": cookie.name,
                "company": cookie.name,
                "f_name": cookie.name,
                "l_name": cookie.name,
                "email": cookie.email,
                "p_number": cookie.email
            };
            let response = await fetch(`https://backend.hairless.brycemw.ca/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            setUser(user);
            console.log(typeof cookie.sub);

            setUserId(cookie.sub);

            if (response.status !== 200) {
                console.log("Error creating user");
            }
        } else {
            let euser = await response.json();
            setAdmin(euser.is_admin);
            let user = {
                "user_id": cookie.sub,
                "is_admin": euser.is_admin,
                "department": cookie.name,
                "company": cookie.name,
                "f_name": cookie.name,
                "l_name": cookie.name,
                "email": cookie.email,
                "p_number": cookie.email
            };
            response = await fetch(`https://backend.hairless.brycemw.ca/users/${cookie?.sub}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            setUser(user);

            setUserId(cookie.sub);

            if (response.status !== 200) {
                console.log("Error updating user");
            }
        }

    },[])

    console.log("id", id);
    console.log("userid", userID);

    async function toggleAdmin() {
        let nuser = user;
        nuser.is_admin = !admin;
        let response = await fetch(`https://backend.hairless.brycemw.ca/users/${user.user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuser)
        });
        setUser(nuser);
        setAdmin(!admin);

        if (response.status !== 200) {
            console.log("Error updating user");
        }
    }

    async function logout() {
        document.cookie = "cat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    }

    return (
        <header>
            <div className="header__container">
                <div className="header_logo">
                    <div className="header_logo_container">
                        <img src={logo} alt="Hairless Cat Logo" className="logo"/>
                    </div>
                    <div className="header_title">
                        <Link to="/" style={{ all: 'unset' }}>Tournament Organizer</Link>
                    </div>
                </div>
                <div>
                    {
                        admin &&
                        <ul className="adminMenu">
                            <li>
                                <Link to={`/createTournament/${userID}`} style={{all: 'unset'}}>
                                    <button className="adminOption one">
                                        Create Tournament
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <button className="adminOption two">
                                    <Link to="/deleteTournament" style={{all: 'unset'}}>Delete Tournament</Link>
                                </button>
                            </li>
                            <li>
                                <button className="adminOption three">
                                    <Link to="/generateSchedule" style={{all: 'unset'}}>Generate Schedule</Link>
                                </button>
                            </li>
                            <li>
                                <button className="adminOption four">
                                    <Link to={`/schedules`} style={{ all: 'unset' }}>Generated Schedules</Link>
                                </button>
                            </li>
                        </ul>
                    }
                    <ul className="employeeMenu">
                        <li>
                            <button className="employeeOption one">
                                <Link to={`/joinTournament/${userID}`} style={{ all: 'unset' }}>Join Tournament</Link>
                            </button>
                        </li>
                        <li>
                            <button className="employeeOption two">
                                <Link to={`/teamList/leader/${userID}`} style={{ all: 'unset' }}>Leader Team Lists</Link>
                            </button>
                        </li>
                        <li>
                            <button className="employeeOption three">
                                <Link to={`/teamList/${userID}`} style={{ all: 'unset' }}>Team Lists</Link>
                            </button>
                        </li>
                        {/*<li>*/}
                        {/*    <button className="employeeOption four">*/}
                        {/*        <Link to="/finishedMatch" style={{ all: 'unset' }}>Finished Tournament</Link>*/}
                        {/*    </button>*/}
                        {/*</li>*/}
                    </ul>
                </div>
                <button className="user_box" onClick={async () => {let res = prompt("Enter the password to toggle admin status or type logout to logout\nHint, it's our course ID", "000"); if (res === "319") {await toggleAdmin()} else if (res === "logout") {await logout()}}} style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "15ch"}}>
                    <span style={{margin: "0.5em"}}>Hi, {id.name}</span>
                    <img src={id.picture} style={{width: '2.5em', height: '2.5em', borderRadius: '1000vw', margin: "0.5em"}} alt="Profile pic"/>
                </button>
            </div>
        </header>
    );
}