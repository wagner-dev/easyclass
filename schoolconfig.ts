import dotenv from 'dotenv'
import { Config  } from './types/config/index'

dotenv.config()

const CONFIG: Config = {
    "authorization": {
        "username": 'example',
        "email": process.env.EMAIL_USER || '',
        "password": process.env.PASSWORD_USER || '',
    },
    "preference": {
        "find_word_in_chat": {
            "keyword": ["example2", "example2"] 
        },
    },
    "schedule": {
        "monday": [
            {
                "matter": "Example",
                "beginning": "00:00",
                "end": "24:00",
                "code": "aaa-aaaa-aaa"
            },
            {
                "matter": "Example",
                "beginning": "00:00",
                "end": "0:00",
                "code": "aaa-aaaa-aaa"
            }
            // (...)
        ],
        "tuesday": [
            {
                "matter": "Example",
                "beginning": "00:00",
                "end": "0:00",
                "code": "aaa-aaaa-aaa"
            }
        ],
        "wednesday": [
            {
                "matter": "Example",
                "beginning": "00:00",
                "end": "0:00",
                "code": "aaa-aaaa-aaa"
            }
        ],
        "thursday": [
            {
                "matter": "Example",
                "beginning": "00:00",
                "end": "0:00",
                "code": "aaa-aaaa-aaa"
            }
        ],
        "friday": [
            {
                "matter": "Example",
                "beginning": "21:08",
                "end": "0:00",
                "code": "eim-cntn-qck"
            }
        ]
    }
}


export default CONFIG