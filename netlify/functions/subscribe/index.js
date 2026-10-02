import axios from 'axios';
import { createHash } from 'node:crypto';

export default async (request) => {
	try {
		const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
		const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
		const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
		const apiRoot = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/`;

		const email = new URL(request.url).searchParams.get('email');
		if (!email) {
			return new Response('email query paramter required', { status: 500 });
		}

		const emailhash = createHash('md5').update(email).digest('hex');

		const response = await axios({
				method: 'put',
				url: apiRoot + emailhash,
				data: {
					email_address: email,
					status: 'subscribed',
					merge_fields: {
						tag:'blog'
					}
				},
				auth: {
					'username': 'anythingreally',
					'password': MAILCHIMP_API_KEY
				}
			});

		return Response.json(response.data);
	} catch (error) {
		return Response.json(error.response?.data || { error: 'Unable to subscribe' }, { status: 500 });
	}
}
