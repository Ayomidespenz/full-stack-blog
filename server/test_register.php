<?php

$url = 'http://localhost:8000/api/auth/register';
$data = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'username' => 'testuser',
    'password' => 'password',
    'password_confirmation' => 'password'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Accept: application/json']);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch) . "\n";
}

curl_close($ch);

echo "HTTP Status: $httpCode\n";
echo "Response: $response\n";
