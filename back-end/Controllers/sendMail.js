//testing mailgun

import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: '5cbdfc461eb75ee6a69bae225e433fb6-f7d687c0-e9a75e0f',
});
mg.messages
	.create(sandbox26acc9b481db4e41af4f57a5e99f39fb.mailgun.org, {
		from: "Mailgun Sandbox <postmaster@sandbox26acc9b481db4e41af4f57a5e99f39fb.mailgun.org>",
		to: ["jogsoham2003@gmail.com"],
		subject: "Hello",
		text: "Testing some Mailgun awesomness!",
	})
	.then(msg => console.log(msg)) // logs response data
	.catch(err => console.log(err)); // logs any error`;


// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.