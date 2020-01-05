
DEFAULT_PASSWORD = "password"


def test_login(client_unauthenticated):
    response = client_unauthenticated.post(
        "/api/auth/login", json=dict(email="test1@test.com", password=DEFAULT_PASSWORD)
    )
    print(response)
    assert response.status_code == 200
    assert response.json.get("access_token")
    assert response.json.get("refresh_token")

    # attempt refresh
    refresh_token = response.json.get("refresh_token")
    response = client_unauthenticated.post(
        "/api/auth/refresh", headers={"Authorization": f"Bearer {refresh_token}"}
    ).json
    access_token = response.get("access_token")

    # test new token
    response = client_unauthenticated.get(
        "/api/auth/check", headers={"Authorization": f"Bearer {access_token}"}
    )
    assert response.status_code == 200
