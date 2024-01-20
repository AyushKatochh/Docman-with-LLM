// contentHeaders.js

import path from "path";

export const getContentHeaders = (filePath) => {
    const contentType = getContentType(filePath);

    switch (contentType) {
        case 'docx':
            return {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Accept': 'text/plain',
                'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
            };
        case 'pptx':
            // Handle PowerPoint files
            return {
                // Set headers for PowerPoint
            };
        case 'xlsx':
            // Handle Excel files
            return {
                // Set headers for Excel
            };
        default:
            throw new Error(`Unsupported file type: ${contentType}`);
    }
};

const getContentType = (filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    switch (extension) {
        case '.docx':
            return 'docx';
        case '.pptx':
            return 'pptx';
        case '.xlsx':
            return 'xlsx';
        default:
            throw new Error(`Unsupported file extension: ${extension}`);
    }
};

