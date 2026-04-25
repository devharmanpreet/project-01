/**
 * ============================================================
 * States and Union Territories Data
 * ============================================================
 * Information about all states and UTs in India
 */

const STATES = [
    // States
    {
        code: 'AN',
        name: 'Andaman and Nicobar Islands',
        email: 'ceo-an@eci.gov.in',
        phone: '+91-3192-232555',
        website: 'https://andaman.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'AP',
        name: 'Andhra Pradesh',
        email: 'apiasec@eci.gov.in',
        phone: '+91-40-2323-1111',
        website: 'https://andhra.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'AR',
        name: 'Arunachal Pradesh',
        email: 'arunachal@eci.gov.in',
        phone: '+91-360-221-2200',
        website: 'https://arunachal.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'AS',
        name: 'Assam',
        email: 'assam@eci.gov.in',
        phone: '+91-361-235-1234',
        website: 'https://assam.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'BR',
        name: 'Bihar',
        email: 'bihar@eci.gov.in',
        phone: '+91-612-221-0741',
        website: 'https://bihar.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'CG',
        name: 'Chhattisgarh',
        email: 'cg@eci.gov.in',
        phone: '+91-771-223-5678',
        website: 'https://chhattisgarh.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'CH',
        name: 'Chandigarh',
        email: 'chandigarh@eci.gov.in',
        phone: '+91-172-270-0200',
        website: 'https://chandigarh.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'DD',
        name: 'Daman and Diu',
        email: 'dd@eci.gov.in',
        phone: '+91-2637-222-300',
        website: 'https://damandiu.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'DL',
        name: 'Delhi',
        email: 'delhi@eci.gov.in',
        phone: '+91-11-4100-1111',
        website: 'https://delhi.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'DN',
        name: 'Dadra and Nagar Haveli',
        email: 'dn@eci.gov.in',
        phone: '+91-2645-540-300',
        website: 'https://dadra.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'GA',
        name: 'Goa',
        email: 'goa@eci.gov.in',
        phone: '+91-832-242-7000',
        website: 'https://goa.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'GJ',
        name: 'Gujarat',
        email: 'guj@eci.gov.in',
        phone: '+91-79-2756-1111',
        website: 'https://gujarat.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'HR',
        name: 'Haryana',
        email: 'haryana@eci.gov.in',
        phone: '+91-172-257-8000',
        website: 'https://haryana.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'HP',
        name: 'Himachal Pradesh',
        email: 'hp@eci.gov.in',
        phone: '+91-177-228-2222',
        website: 'https://himachal.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'JK',
        name: 'Jammu and Kashmir',
        email: 'jk@eci.gov.in',
        phone: '+91-194-240-0000',
        website: 'https://jammu-kashmir.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'JH',
        name: 'Jharkhand',
        email: 'jharkhand@eci.gov.in',
        phone: '+91-651-243-0000',
        website: 'https://jharkhand.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'KA',
        name: 'Karnataka',
        email: 'karnataka@eci.gov.in',
        phone: '+91-80-4070-1111',
        website: 'https://karnataka.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'KL',
        name: 'Kerala',
        email: 'kerala@eci.gov.in',
        phone: '+91-484-222-5555',
        website: 'https://kerala.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'LD',
        name: 'Lakshadweep',
        email: 'lakshadweep@eci.gov.in',
        phone: '+91-4896-222-200',
        website: 'https://lakshadweep.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'MP',
        name: 'Madhya Pradesh',
        email: 'mp@eci.gov.in',
        phone: '+91-755-265-0000',
        website: 'https://madhyapradesh.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'MH',
        name: 'Maharashtra',
        email: 'maharashtra@eci.gov.in',
        phone: '+91-22-2152-2000',
        website: 'https://maharashtra.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'MN',
        name: 'Manipur',
        email: 'manipur@eci.gov.in',
        phone: '+91-385-245-8888',
        website: 'https://manipur.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'ML',
        name: 'Meghalaya',
        email: 'meghalaya@eci.gov.in',
        phone: '+91-364-222-2222',
        website: 'https://meghalaya.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'MZ',
        name: 'Mizoram',
        email: 'mizoram@eci.gov.in',
        phone: '+91-389-233-3333',
        website: 'https://mizoram.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'NL',
        name: 'Nagaland',
        email: 'nagaland@eci.gov.in',
        phone: '+91-370-224-4444',
        website: 'https://nagaland.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'OD',
        name: 'Odisha',
        email: 'odisha@eci.gov.in',
        phone: '+91-674-253-5555',
        website: 'https://odisha.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'PY',
        name: 'Puducherry',
        email: 'puducherry@eci.gov.in',
        phone: '+91-413-292-0000',
        website: 'https://puducherry.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'PB',
        name: 'Punjab',
        email: 'punjab@eci.gov.in',
        phone: '+91-172-270-6666',
        website: 'https://punjab.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'RJ',
        name: 'Rajasthan',
        email: 'rajasthan@eci.gov.in',
        phone: '+91-141-511-2200',
        website: 'https://rajasthan.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'SK',
        name: 'Sikkim',
        email: 'sikkim@eci.gov.in',
        phone: '+91-3592-224-400',
        website: 'https://sikkim.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'TN',
        name: 'Tamil Nadu',
        email: 'tamilnadu@eci.gov.in',
        phone: '+91-44-2822-1111',
        website: 'https://tamilnadu.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'TR',
        name: 'Tripura',
        email: 'tripura@eci.gov.in',
        phone: '+91-381-228-8888',
        website: 'https://tripura.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'UP',
        name: 'Uttar Pradesh',
        email: 'up@eci.gov.in',
        phone: '+91-522-221-0000',
        website: 'https://uttar-pradesh.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'UK',
        name: 'Uttarakhand',
        email: 'uttarakhand@eci.gov.in',
        phone: '+91-135-274-4000',
        website: 'https://uttarakhand.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    },
    {
        code: 'WB',
        name: 'West Bengal',
        email: 'westbengal@eci.gov.in',
        phone: '+91-33-2286-1111',
        website: 'https://westbengal.eci.gov.in',
        registrationLink: 'https://electoralsearch.eci.gov.in/'
    }
];
