(function (app) {
    const countySiteLocations = {
    "Aberdeenshire": ["Aberdeen", "Peterhead", "Fraserburgh", "Stonehaven"],
    "Aberdeen City": ["Aberdeen", "Dyce", "Bridge of Don", "Cove Bay"],
    "Angus": ["Forfar", "Arbroath", "Montrose", "Brechin"],
    "Antrim": ["Belfast", "Lisburn", "Antrim", "Ballymena"],
    "Argyll and Bute": ["Oban", "Dunoon", "Campbeltown", "Helensburgh"],
    "Armagh": ["Armagh", "Craigavon", "Lurgan", "Portadown"],
    "Bedfordshire": ["Bedford", "Luton", "Dunstable", "Leighton Buzzard"],
    "Berkshire": ["Reading", "Slough", "Windsor", "Newbury"],
    "Blaenau Gwent": ["Ebbw Vale", "Abertillery", "Brynmawr", "Tredegar"],
    "Bridgend": ["Bridgend", "Porthcawl", "Maesteg", "Pencoed"],
    "Bristol": ["Bristol", "Clifton", "Avonmouth", "Filwood"],
    "Buckinghamshire": ["Aylesbury", "Milton Keynes", "High Wycombe", "Amersham"],
    "Caerphilly": ["Caerphilly", "Blackwood", "Bargoed", "Risca"],
    "Cambridgeshire": ["Cambridge", "Peterborough", "Ely", "Huntingdon"],
    "Cardiff": ["Cardiff", "Llandaff", "Roath", "Canton"],
    "Carmarthenshire": ["Carmarthen", "Llanelli", "Ammanford", "Llandeilo"],
    "Ceredigion": ["Aberystwyth", "Cardigan", "Lampeter", "Aberaeron"],
    "Cheshire": ["Chester", "Warrington", "Crewe", "Macclesfield"],
    "City of London": ["City of London", "Bank", "Barbican", "Blackfriars"],
    "Conwy": ["Conwy", "Llandudno", "Colwyn Bay", "Abergele"],
    "Cornwall": ["Truro", "Falmouth", "St Austell", "Penzance"],
    "Cumbria": ["Carlisle", "Kendal", "Barrow-in-Furness", "Workington"],
    "Denbighshire": ["Rhyl", "Denbigh", "Prestatyn", "Ruthin"],
    "Derbyshire": ["Derby", "Chesterfield", "Buxton", "Matlock"],
    "Devon": ["Exeter", "Plymouth", "Torquay", "Barnstaple"],
    "Dorset": ["Bournemouth", "Poole", "Weymouth", "Dorchester"],
    "Down": ["Newry", "Bangor", "Downpatrick", "Newtownards"],
    "Dumfries and Galloway": ["Dumfries", "Stranraer", "Annan", "Castle Douglas"],
    "Durham": ["Durham", "Darlington", "Hartlepool", "Stockton-on-Tees"],
    "East Ayrshire": ["Kilmarnock", "Cumnock", "Stewarton", "Dalmellington"],
    "East Lothian": ["Haddington", "Musselburgh", "North Berwick", "Dunbar"],
    "East Riding of Yorkshire": ["Beverley", "Bridlington", "Goole", "Driffield"],
    "East Sussex": ["Brighton", "Eastbourne", "Hastings", "Lewes"],
    "Edinburgh": ["Edinburgh", "Leith", "Portobello", "Morningside"],
    "Essex": ["Chelmsford", "Colchester", "Southend-on-Sea", "Basildon"],
    "Fermanagh": ["Enniskillen", "Lisnaskea", "Irvinestown", "Belleek"],
    "Fife": ["Dunfermline", "Kirkcaldy", "Glenrothes", "St Andrews"],
    "Flintshire": ["Mold", "Flint", "Connah's Quay", "Buckley"],
    "Glasgow": ["Glasgow", "Partick", "Govan", "Springburn"],
    "Gloucestershire": ["Gloucester", "Cheltenham", "Stroud", "Tewkesbury"],
    "Greater London": ["Westminster", "Camden", "Croydon", "Ealing"],
    "Greater Manchester": ["Manchester", "Bolton", "Stockport", "Wigan"],
    "Gwynedd": ["Bangor", "Caernarfon", "Porthmadog", "Dolgellau"],
    "Hampshire": ["Winchester", "Southampton", "Portsmouth", "Basingstoke"],
    "Herefordshire": ["Hereford", "Leominster", "Ross-on-Wye", "Ledbury"],
    "Hertfordshire": ["St Albans", "Watford", "Stevenage", "Hemel Hempstead"],
    "Highland": ["Inverness", "Fort William", "Wick", "Aviemore"],
    "Isle of Anglesey": ["Holyhead", "Llangefni", "Amlwch", "Menai Bridge"],
    "Isle of Wight": ["Newport", "Ryde", "Cowes", "Sandown"],
    "Kent": ["Maidstone", "Canterbury", "Dover", "Ashford"],
    "Lancashire": ["Lancaster", "Preston", "Blackpool", "Burnley"],
    "Leicestershire": ["Leicester", "Loughborough", "Hinckley", "Melton Mowbray"],
    "Lincolnshire": ["Lincoln", "Boston", "Grantham", "Skegness"],
    "Londonderry": ["Derry/Londonderry", "Coleraine", "Limavady", "Magherafelt"],
    "Merseyside": ["Liverpool", "Birkenhead", "St Helens", "Southport"],
    "Merthyr Tydfil": ["Merthyr Tydfil", "Treharris", "Dowlais", "Cefn-coed-y-cymmer"],
    "Midlothian": ["Dalkeith", "Bonnyrigg", "Penicuik", "Loanhead"],
    "Monmouthshire": ["Abergavenny", "Chepstow", "Monmouth", "Usk"],
    "Moray": ["Elgin", "Forres", "Buckie", "Lossiemouth"],
    "Neath Port Talbot": ["Neath", "Port Talbot", "Pontardawe", "Glynneath"],
    "Newport": ["Newport", "Caerleon", "Rogerstone", "Pillgwenlly"],
    "Norfolk": ["Norwich", "King's Lynn", "Great Yarmouth", "Thetford"],
    "North Yorkshire": ["York", "Harrogate", "Scarborough", "Skipton"],
    "Northamptonshire": ["Northampton", "Kettering", "Corby", "Wellingborough"],
    "Northumberland": ["Morpeth", "Alnwick", "Berwick-upon-Tweed", "Hexham"],
    "Nottinghamshire": ["Nottingham", "Mansfield", "Newark-on-Trent", "Worksop"],
    "Oxfordshire": ["Oxford", "Banbury", "Abingdon", "Bicester"],
    "Pembrokeshire": ["Haverfordwest", "Pembroke", "Milford Haven", "Tenby"],
    "Perth and Kinross": ["Perth", "Blairgowrie", "Crieff", "Pitlochry"],
    "Powys": ["Newtown", "Brecon", "Welshpool", "Llandrindod Wells"],
    "Renfrewshire": ["Paisley", "Renfrew", "Johnstone", "Erskine"],
    "Rhondda Cynon Taf": ["Pontypridd", "Aberdare", "Llantrisant", "Treorchy"],
    "Rutland": ["Oakham", "Uppingham", "Ketton", "Cottesmore"],
    "Scottish Borders": ["Galashiels", "Hawick", "Peebles", "Kelso"],
    "Shropshire": ["Shrewsbury", "Telford", "Oswestry", "Ludlow"],
    "Somerset": ["Taunton", "Bath", "Yeovil", "Bridgwater"],
    "South Ayrshire": ["Ayr", "Prestwick", "Troon", "Girvan"],
    "South Glamorgan": ["Barry", "Penarth", "Cowbridge", "Llantwit Major"],
    "South Yorkshire": ["Sheffield", "Doncaster", "Rotherham", "Barnsley"],
    "Staffordshire": ["Stafford", "Stoke-on-Trent", "Tamworth", "Lichfield"],
    "Suffolk": ["Ipswich", "Bury St Edmunds", "Lowestoft", "Felixstowe"],
    "Surrey": ["Guildford", "Woking", "Epsom", "Reigate"],
    "Swansea": ["Swansea", "Mumbles", "Gorseinon", "Morriston"],
    "Torfaen": ["Cwmbran", "Pontypool", "Blaenavon", "Ponthir"],
    "Tyrone": ["Omagh", "Dungannon", "Cookstown", "Strabane"],
    "Tyne and Wear": ["Newcastle upon Tyne", "Sunderland", "Gateshead", "South Shields"],
    "Vale of Glamorgan": ["Barry", "Penarth", "Cowbridge", "Llantwit Major"],
    "Warwickshire": ["Warwick", "Rugby", "Nuneaton", "Stratford-upon-Avon"],
    "West Midlands": ["Birmingham", "Coventry", "Wolverhampton", "Solihull"],
    "West Sussex": ["Chichester", "Crawley", "Worthing", "Horsham"],
    "West Yorkshire": ["Leeds", "Bradford", "Wakefield", "Huddersfield"],
    "Wiltshire": ["Salisbury", "Swindon", "Chippenham", "Trowbridge"],
    "Worcestershire": ["Worcester", "Redditch", "Kidderminster", "Malvern"],
    "Wrexham": ["Wrexham", "Ruabon", "Chirk", "Gresford"]
};

    const validCounties = [
        "Warwickshire",
        "Worcestershire",
        "HD",
        "Derbyshire",
        "Staffordshire",
        "Leicestershire",
        "Shropshire",
        "Wrexham HD",
        "Cheshire",
        "Central",
        "Nottinghamshire",
        "Gloucestershire"
    ];

    const countyControlGroups = {
        "Warwickshire": [
            "Rsa(Warks)",
            "Draycote",
            "Campion",
            "Oversley To Chesford",
            "Coventry",
            "Wellesbourne",
            "Shipston",
            "Hatton",
            "North Warwickshire",
            "Nuneaton",
            "Bedworth",
            "Avon Soar",
            "Redditch"
        ],
        "Leicestershire": [
            "Dva To Hallgates",
            "Uppingham / Oakham",
            "Ragdale Wolds",
            "Knaptoft",
            "Melbourne To Ragdale",
            "Hinckley",
            "Scraptoft",
            "High Tor",
            "Willesley / Hartshorne",
            "Field Head",
            "Leicester Low Level",
            "Burrough & Barsby",
            "Hallgates / Ragdale",
            "Melbourne To Hallgates"
        ],
        "Derbyshire": [
            "Derby North",
            "Derby South",
            "Mid Derby",
            "Buxton Cluster"
        ],
        "Worcestershire": [
            "Worcester North",
            "Worcester South",
            "Redditch Area",
            "Bromsgrove"
        ],
        "Staffordshire": [
            "Stafford North",
            "Stafford South",
            "Stoke-on-Trent",
            "Tamworth"
        ],
        "Shropshire": [
            "Shrewsbury",
            "Ludlow",
            "Market Drayton",
            "Oswestry"
        ],
        "Cheshire": [
            "Chester",
            "Warrington",
            "Crewe",
            "Macclesfield"
        ],
        "Nottinghamshire": [
            "Nottingham North",
            "Nottingham South",
            "Mansfield",
            "Newark"
        ],
        "Gloucestershire": [
            "Gloucester",
            "Cheltenham",
            "Stroud",
            "Forest of Dean"
        ]
    };

    const assetTypes = [
        "DBS",
        "DSR",
        "High Pressure",
        "Low Pressure",
        "Network Asset"
    ];

    let interventions = [];

    const buildUrl = (baseUrl, filters) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => item && params.append(key, item));
                return;
            }

            if (value) {
                params.append(key, value);
            }
        });

        const query = params.toString();

        return query ? `${baseUrl}?${query}` : baseUrl;
    };

    app.InterventionService = {
        getCountyNames() {
            return validCounties.sort();
        },

        getControlGroupNames(county) {
            if (county && countyControlGroups[county]) {
                return countyControlGroups[county].slice().sort();
            }

            return Array.from(new Set(Object.values(countyControlGroups).flat())).sort();
        },

        getAssetTypeNames() {
            return assetTypes.slice().sort();
        },

        getSiteLocations(county) {
            if (county) {
                return countySiteLocations[county] || [];
            }

            return Array.from(new Set(Object.values(countySiteLocations).flat())).sort();
        },

        getInterventions() {
            return interventions;
        },

        async load(baseUrl, filters) {
            const response = await fetch(buildUrl(baseUrl, filters), {
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Unable to load interventions.");
            }

            interventions = await response.json();
            return interventions;
        }
    };
})(window.InterventionCalendar = window.InterventionCalendar || {});
