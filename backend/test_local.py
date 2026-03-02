"""
Local testing script for Lambda function
"""

import json
from lambda_function import lambda_handler

def test_weather_endpoint():
    """Test weather endpoint"""
    event = {
        'httpMethod': 'GET',
        'path': '/weather',
        'queryStringParameters': {
            'location': 'Bangalore'
        }
    }
    
    response = lambda_handler(event, None)
    print("Weather Response:", json.dumps(response, indent=2))
    assert response['statusCode'] == 200

def test_schemes_endpoint():
    """Test schemes endpoint"""
    event = {
        'httpMethod': 'GET',
        'path': '/schemes'
    }
    
    response = lambda_handler(event, None)
    print("Schemes Response:", json.dumps(response, indent=2))
    assert response['statusCode'] == 200

if __name__ == '__main__':
    print("Running local tests...")
    test_weather_endpoint()
    test_schemes_endpoint()
    print("All tests passed!")
