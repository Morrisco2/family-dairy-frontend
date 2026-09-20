export const handleImageUpload = (e, setInput, setShowAlert) => {
    const file = e.target.files?.[0];

    // No file selected
    if (!file) {
        setInput((prev) => ({
            ...prev,
            image: null,
        }));
        return;
    }

    // Allowed image MIME types
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
    ];

    // Check file type
    if (!allowedTypes.includes(file.type)) {
        // alert(" (JPG, PNG, WEBP, or GIF).");
        setShowAlert((prev) => ({
            ...prev,
            show: true,
            message: "Please upload a valid image format",
            status: "failed"
        }))

        // Reset file input
        e.target.value = "";

        setInput((prev) => ({
            ...prev,
            image: null,
        }));

        return;
    }

    // Maximum file size: 5MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
        setShowAlert((prev) => ({
            ...prev,
            show: true,
            message: "Image size must not exceed 5MB.",
            status: "failed"
        }))

        // Reset file input
        e.target.value = "";

        setInput((prev) => ({
            ...prev,
            image: null,
        }));

        return;
    }

    // Save the File object into input.image
    setInput((prev) => ({
        ...prev,
        image: file,
    }));
};