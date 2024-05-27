export const addFile = {
    "tag": "form",
    "attributes": {
        "id": "fileUploadForm",
        "method": "POST",
        "enctype": "multipart/form-data",
        
    },
    "children": [
        {
            "tag": "input",
            "attributes": {
                "type": "file",
                "id": "fileUpload",
                "change": "create-file"
            }
        },
        {
            "tag": "button",
            "attributes": {
                "type": "submit"
            },
            "content": "Upload"
        }
    ]
}

