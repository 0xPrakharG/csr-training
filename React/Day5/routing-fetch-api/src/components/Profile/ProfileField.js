const ProfileField = ({ label, value }) => {
    return (
        <div className="profile-fields">
            <p className="profile-label">{label}</p>
            <p className="profile-label">{value}</p>
        </div>
    );
};

export default ProfileField;
