/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Mailchimp from "mailchimp-api-v3";
import { VercelRequest, VercelResponse } from "@vercel/node";

const mailchimp = new Mailchimp(process.env.GATSBY_MAILCHIMP?? '');

type MailchimpProps = {
  "id": string;
  "email_address": string;
  "unique_email_id": string;
  "web_id": number;
  "email_type": string;
  "status": string;
  "unsubscribe_reason": string;
  "merge_fields": {
    "property1": string;
    "property2": string;
  },
  "interests": {
    "property1": true,
    "property2": true
  },
  "stats": {
    "avg_open_rate": number;
    "avg_click_rate": number;
    "ecommerce_data": {
      "total_revenue": number;
      "number_of_orders": number;
      "currency_code":string;
    }
  },
  "ip_signup": string;
  "timestamp_signup": string;
  "ip_opt": string;
  "timestamp_opt": string;
  "member_rating": number;
  "last_changed": string;
  "language": string;
  "vip": true,
  "email_client": string;
  "location": {
    "latitude": number;
    "longitude": number;
    "gmtoff": number;
    "dstoff": number;
    "country_code": string;
    "timezone": string;
  },
  "marketing_permissions": [
    {
      "marketing_permission_id": string;
      "text": string;
      "enabled": true
    }
  ],
  "last_note": {
    "note_id": number;
    "created_at": string;
    "created_by": string;
    "note": string;
  },
  "source": string;
  "tags_count": number;
  "tags": [
    {
      "id": number;
      "name":string;
    }
  ],
  "list_id": string;
  "_links": [
    {
      "rel": string;
      "href": string;
      "method": string;
      "targetSchema": string;
      "schema": string;
    }
  ]
}

type MailchimpErrorProps = {
  "type": string;
  "title": string;
  "status": number;
  "detail":string;
  "instance": string;
}
export default (request: VercelRequest, response: VercelResponse) => {
  const { email } = request.body;
  return mailchimp
    .post("/lists/c2608cffee/members", {
      email_address: email,
      status: "subscribed",
    })
    .then(function (results: MailchimpProps) {
      console.log(results);
      response.send(results);
    })
    .catch(function (err: MailchimpErrorProps) {
      console.log(err.status);
    });
};
