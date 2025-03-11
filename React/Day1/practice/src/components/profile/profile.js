import profile from "../../images/profile.png";

// const person = {
//     firstName: "Prakhar",
//     lastName: "Goyal",
//     age: 23,
//     occupation: "Software Developer",
// };

function Profile(props) {
    const { person, email, onClick } = props;
    return (
        <>
            <img src={profile} alt="profile" />
            <p>First Name: {person.firstName}</p>
            <p>Last Name: {person.lastName}</p>
            <p>Email: {email}</p>
            <p>Age: {person.age}</p>
            <p>Occupation: {person.occupation}</p>
            <button onClick={onClick}>Button</button>
        </>
    );
}

export default Profile;
