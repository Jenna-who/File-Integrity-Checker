document.getElementById('uploadForm').onsubmit = async function(event) {
    event.preventDefault();
    
    const file1 = document.getElementById('file1').files[0];
    const file2 = document.getElementById('file2').files[0];
    
    if (!file1 || !file2) {
        document.getElementById('result').textContent = 'Please select both files.';
        return;
    }

    const hash1 = await calculateHash(file1);
    const hash2 = await calculateHash(file2);

    const result = hash1 === hash2 ? 'Files are identical' : 'Files are different';
    document.getElementById('result').textContent = result;
};

async function calculateHash(file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    return Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
}
