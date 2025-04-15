import { useEffect, useState } from "react";

const PostTagsTable = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPostTags = () => {
        fetch("https://dummyjson.com/posts/tags")
            .then((res) => res.json())
            .then((data) => {
                setTags(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching tags:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getPostTags();
    }, []);

    return (
        <div className="post-tags-table-container">
            <h2 className="post-tags-table-header">Post Tags Table</h2>
            {loading ? (
                <p className="loader">Loading Post Tags...</p>
            ) : (
                <table className="tags-table">
                    <thead>
                        <tr className="tags-table-row">
                            <th>Tag Name</th>
                            <th>Slug</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.map((tag, index) => (
                            <tr key={index} className="tags-table-row">
                                <td>{tag.name}</td>
                                <td>{tag.slug}</td>
                                <td>
                                    <a
                                        href={tag.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PostTagsTable;
