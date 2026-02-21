import requests
import json

def test_rag_pipeline():
    """Test the RAG pipeline by making a request to the chat API"""
    url = "http://localhost:3001/api/chat"

    # Test query about barber services
    payload = {
        "message": "What are the main services offered at your barber shop?",
        "sessionId": "python-test-123"
    }

    headers = {
        "Content-Type": "application/json"
    }

    print("Testing RAG pipeline with Python...")
    print(f"Sending request to: {url}")
    print(f"Query: {payload['message']}")

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)

        print(f"\n✅ Response Status: {response.status_code}")
        response_data = response.json()
        print(f"✅ Response Content: {json.dumps(response_data, indent=2)}")

        if response.status_code == 200:
            print(f"\n✅ RAG Pipeline Working!")
            print(f"✅ Response Length: {len(response_data['response'])} characters")
            print(f"✅ Session ID: {response_data['sessionId']}")

            # Check for relevant barber terms in the response
            response_text = response_data['response'].lower()
            terms_found = []
            terms_not_found = []

            for term in ['barber', 'shave', 'haircut', 'beard', 'grooming']:
                if term in response_text:
                    terms_found.append(term)
                else:
                    terms_not_found.append(term)

            print(f"\n✅ Terms found in response: {', '.join(terms_found)}")
            if terms_not_found:
                print(f"ℹ️  Terms not explicitly mentioned: {', '.join(terms_not_found)}")
        else:
            print(f"❌ Unexpected status code: {response.status_code}")

    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
    except json.JSONDecodeError:
        print(f"❌ Could not parse JSON response: {response.text}")

if __name__ == "__main__":
    test_rag_pipeline()