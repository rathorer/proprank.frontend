const api_url = import.meta.env.API_URL;
export const POST = async ({ request }) => {
    const auth = request;
    console.log(auth.headers.get("authorization").replace('Bearer ', ''));
    console.log("auth json clicked");

    // let response = await fetch(`${api_url}api/user/login`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(credentials)
    // });
    // let status = response.status;
    // const result = await response.json();
    // return { result, status };
    return new Response(JSON.stringify("response"), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
