import { useEffect, useState } from "react";

const PostTagList = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/posts/tag-list")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch tags");
                return res.json();
            })
            .then((data) => {
                setTags(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="loader">Loading Tag List...</p>;

    return (
        <div className="post-tags-list">
            <h2 className="tags-title">Post Tags List</h2>
            <ul className="tags-list">
                {tags.map((tag, index) => (
                    <li key={index} className="tag-item">
                        {tag}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostTagList;
