/**
 * @file Main file. Creates the express app.
 * @module index.js
 */

//============================= Init =============================//
const express = require('express');
const neo4j = require('neo4j-driver');
const bodyParser = require('body-parser');

const multer  = require('multer');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

// Configuration de Multer pour stocker temporairement les fichiers audio dans le dossier 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');  // Dossier de destination pour les fichiers uploadés
    },
    filename: function (req, file, cb) {
      // extension .wav, 
      cb(null, file.originalname);
    }
  });
const upload = multer({ storage: storage });


const uri = 'neo4j://localhost:7687'; // default dor cypher-shell neo4j://localhost:7687
// cypher-shell -u neo4j -p root -a neo4j://localhost:7687
const user = 'neo4j'

// Read passowrd for file
var password;
const fs = require('fs');
const { data } = require('jquery');
try {
    log('info', 'Reading password from file (`.database_password`) ...');
    password = fs.readFileSync('.database_password', 'utf8');
    password = password.replace('\n', '');
    log('info', 'Password has been read.');
} catch (err) {
    password = '12345678';
    log('warn', `Error when reading password from file: ${err}\nUsing default password (12345678) instead.`);
}

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password)); 
const session = driver.session();

//setting view engine to ejs
app.set("view engine", "ejs");

app.use(express.static('assets'))
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('data'));
app.use('/data', express.static('data'));

// préfixe global basé sur l'environnement (production ou développement)
const BASE_PATH = process.env.BASE_PATH || ''; // '/skrid' en production, '' en local

// Rendre le préfixe disponible dans tous les templates EJS
app.use((req, res, next) => {
    res.locals.BASE_PATH = BASE_PATH;
    next();
  });


//============================= Functions =============================//
/**
 * Print the date and time, `level`, and `msg`.
 *
 * @param {string} level - the level of the log ('error', 'warn', 'info', ...) ;
 * @param {string} msg - the message to log.
 */
function log(level, msg) {
    console.log(`${(new Date().toUTCString())} - ${level}: ${msg}`);
}

/**
 * Check if the query contain some keywords that modify the database.
 *
 * @param {string} query - the cypher query
 * @returns {boolean} true if query would modify the database, false otherwise.
 */
function queryEditsDB(query) {
    let keywords = ['create', 'delete', 'set', 'remove', 'detach', 'load'];
    let queryLower = query.toLowerCase();

    for (let k = 0 ; k < keywords.length ; ++k) {
        if (queryLower.includes(keywords[k])) {
            log('info', `query contains "${keywords[k].toUpperCase()}" keyword. Aborting it.`);
            return true;
        }
    }

    return false;
}

/**
 * Logs the error and return a string corresponding to the problem (string that will be shown to the client).
 *
 * @param {string} caller - the caller name (e.g '/formulateQuery'). Used for logs ;
 * @param {*} data - the error data.
 */
function handlePythonStdErr(caller, data) {
    let errorString = data.toString();

    if (!(errorString.includes('site-packages/pydub/utils.py:') && errorString.includes(' SyntaxWarning: invalid escape sequence'))) {
        log('error', `${caller}: received data on stderr from python script: "${data}"`);

        // Database not turned on
        if (errorString.includes('neo4j.exceptions.ServiceUnavailable: Unable to retrieve routing information'))
            return 'Not connected to the database !\nPlease contact the administrator.';

        if (errorString.includes('neo4j.exceptions.AuthError') && errorString.includes('Neo.ClientError.Security.Unauthorized'))
            return 'Wrong database password !\nPlease contact the administrator.';

        return errorString;
    }
}

//============================= Images =============================//
app.use(express.static('assets/public/')); // Everything in this folder will be available through the web

//============================= Pages (get) =============================//
/**
 * Route for the home page.
 *
 * GET
 *
 * @constant /
 */

// Définir une route pour le fichier config.js qui injecte le BASE_PATH
app.get('/scripts/config.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.send(`const BASE_PATH = '${BASE_PATH}';`);
});

app.get("/", function(req,res){
    res.render("home");
});

/**
 * Route for the plus page.
 *
 * GET
 *
 * @constant /plus
 */
app.get("/plus", function (req, res) {
    res.render("plus");
});

/**
 * Route for the references page.
 *
 * GET
 *
 * @constant /references
 */
app.get("/references", function (req, res) {
    res.render("references");
});


/**
 * Route for the research page with the piano interface.
 *
 * GET
 *
 * @constant /searchInterface
 */
app.get('/searchInterface', async function (req, res) {
    let authors = [];

    try {
        // The query to get the authors is necessary to display the list of possible collections
        const authorQuery = "MATCH (s:Score) RETURN DISTINCT s.collection";
        let temp2 = await session.run(authorQuery);
        temp2 = temp2.records;
        temp2.forEach((record) => {
            authors.push(record._fields[0]);
        });
    } catch(err) {
        log('error', `/searchInterface: ${err}`)
    }

    res.render("search_interface", {
        authors: authors
    });
});

/**
 * Route for the contour search page.
 *
 * GET
 *
 * @constant /contourSearchInterface
 */
app.get('/contourSearchInterface', async function (req, res) {
    let authors = [];

    try {
        // The query to get the authors is necessary to display the list of possible collections
        const authorQuery = "MATCH (s:Score) RETURN DISTINCT s.collection";
        let temp2 = await session.run(authorQuery);
        temp2 = temp2.records;
        temp2.forEach((record) => {
            authors.push(record._fields[0]);
        });
    } catch(err) {
        log('error', `/contourSearchInterface: ${err}`)
    }

    res.render("contour_search_interface", {
        authors: authors
    });
});

/**
 * Route for the research page with the microphone interface.
 *
 * GET
 *
 * @constant /formulateQueryFromMicrophone
 */
app.get('/formulateQueryFromMicrophone', async function (req, res) {
    let authors = [];

    try {
        // The query to get the authors is necessary to display the list of possible collections
        const authorQuery = "MATCH (s:Score) RETURN DISTINCT s.collection";
        let temp2 = await session.run(authorQuery);
        temp2 = temp2.records;
        temp2.forEach((record) => {
            authors.push(record._fields[0]);
        });
    } catch(err) {
        log('error', `/formulateQueryFromMicrophone: ${err}`)
    }

    res.render("formulateQueryFromMicrophone", {
        authors: authors
    });
});

/**
 * Route for help page
 * 
 * GET
 *
 * @constant /help
 */
app.get("/help", function (req, res) {
    res.render("help");
});

/**
 * This endpoint will redirect the user to the 'collections' page .
 * Before redirecting, it queries the database in order to get the list of collections.
 *
 * GET
 *
 * @constant /collections
 */
app.get('/collections', async function (req, res) {
    // let results = [];
    let authors = [];

    const session = driver.session();

    try {
        //---Get authors (to display the different collections)
        //const authorQuery = "MATCH (s:Score) RETURN DISTINCT s.composer";
        const authorQuery = "MATCH (s:Score) RETURN DISTINCT s.collection";
        let temp2 = await session.run(authorQuery);
        temp2 = temp2.records;
        temp2.forEach((record) => {
            //authors.push(record._fields[0].substring(13).slice(0,-6));
            authors.push(record._fields[0]);
        });

        //---Get collection of the first author
        // const name = authors[0];
        // const myQuery = "MATCH (s:Score) WHERE s.collection CONTAINS $name RETURN s ORDER BY s.source LIMIT 1";
        // let temp = await session.run(myQuery, {name: name});
        // results = temp.records;

    } catch(err) {
        log('error', `/collections: ${err}`)
    }

    res.render("collections", {
        // results: results,
        authors: authors,
    });
})

/**
 * Route for the result page.
 *
 * GET
 *
 * @constant /result
 */
app.get('/result', (req, res) => {
    res.render("result");
});

/**
 * This endpoint is called to get the score of a specific composer/author.
 *
 * GET
 *
 * @constant /getCollectionByAuthor
 */
app.get('/getCollectionByAuthor', async (req, res) => {
    let results = [];
    const name = req.query.author;
    const session = driver.session();

    try {
        //const myQuery = "MATCH (s:Score) WHERE s.composer CONTAINS $name RETURN s ORDER BY s.source";
        const myQuery = "MATCH (s:Score) WHERE s.collection CONTAINS $name RETURN s ORDER BY s.source";
        let temp = await session.run(myQuery, {name: name});
        results = temp.records;
    } catch(err) {
        log('error', `/getCollectionByAuthor: ${err}`)
    }

    res.json({
        results: results,
        author: name,
    });
})

/**
 * This endpoint will search for all the scores containing in the title the string inserted by the user in the search bar.
 *
 * Note: not currently used (seems that it was used with a text search bar at the top of the piano interface page).
 *
 * GET
 *
 * @constant /search
 * @todo this seems to be a duplicate of /searchInterface
 */
app.get('/search', async function(req, res) {
    const query = req.query.query;
    let results = [];
    let authors = [];

    try {
        const myQuery = "MATCH (s:Score) WHERE s.source CONTAINS $query RETURN s ORDER BY s.source DESC";
        let temp = await session.run(myQuery, {query: query});
        results = temp.records;

        //const authorQuery = "MATCH (s:Score) RETURN DISTINCT s.composer";
        const authorQuery = "MATCH (s:Score) RETURN DISTINCT s.collection";
        let temp2 = await session.run(authorQuery);
        temp2 = temp2.records;
        temp2.forEach((record) => {
            //authors.push(record._fields[0].substring(13).slice(0,-6));
            authors.push(record._fields[0]);
        });
    } catch(err) {
        log('error', err);
    }

    res.render("search_interface", {
        results: results,
        authors: authors,
    });
});

//============================= Endpoints (post) =============================//
/**
 * This endpoint sends the query to the database (if it does not modify the database) and send the result back to the client.
 *
 * POST
 *
 * @constant /crisp-query
 */
app.post('/crisp-query', (req, res) => {
    const query = req.body.query;

    if (queryEditsDB(query)) {
        return res.json({ error: 'Operation not allowed.' });
    }

    log('info', `/crisp-query: forwarding query to Flask backend`);

    fetch('http://localhost:5000/execute-crisp-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: query,
            uri: uri,
            user: user,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error)
            return res.json({ error: data.error });

        return res.json({ results: data.results });
    })
    .catch(error => {
        log('error', `/crisp-query: ${error.message}`);
        return res.json({ error: error.message });
    });
});

/**
 * This endpoint makes a fuzzy query from notes, filters and fuzzy parameters.
 *
 * Data to post :
 *     ```
 *     {
 *         'notes': "[(class, octave, duration), ...]",
 *         'pitch_distance': float,
 *         'duration_factor': float,
 *         'duration_gap': float,
 *         'alpha': float,
 *         'allow_transposition': bool,
 *         'contour_match': bool,
 *         'collection': str
 *     }
 *     ```
 * If some parameters (apart `notes`) are not specified, they will take their default values.
 * 
 * Returns a fuzzy query, in the following form: `{'query': string}`
 *
 * POST
 *
 * @constant /formulateQuery
 */
app.post('/formulateQuery', async (req, res) => {
    try {
        const response = await fetch('http://localhost:5000/generate-query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();  // Receive { query: ... } or { error: ... }

        if (!response.ok) {
            return res.status(response.status).json({ error: data.error || 'Flask returned an error' });
        }

        return res.json(data);  // Forward response to browser

    } catch (error) {
        console.error('/formulateQuery failed:', error);
        return res.status(500).json({ error: 'Internal server error connecting to Flask API' });
    }
});


// Endpoint pour traiter l'audio et créer une requête
/** 
*
* @constant /createQueryFromAudio
*/
app.post('/createQueryFromAudio', upload.single('audio'), (req, res) => {
    // Get the params
    let pitch_distance = req.body.pitch_distance;
    let duration_factor = req.body.duration_factor;
    let duration_gap = req.body.duration_gap;
    let alpha = req.body.alpha;
    let allow_transposition = req.body.allow_transposition;
    let contour_match = req.body.contour_match;
    let collection = req.body.collection;

    // Set default values if some params are null
    if (pitch_distance == null)
        pitch_distance = 0;
    if (duration_factor == null)
        duration_factor = 1;
    if (duration_gap == null)
        duration_gap = 0;
    if (alpha == null)
        alpha = 0;
    if (allow_transposition == null)
        allow_transposition = false;
    if (contour_match == null)
        contour_match = false;

    // Create the connection
    log('info', `/formulateQuery: openning connection.`);
    const { spawn } = require('child_process');
    let args = [
        'compilation_requete_fuzzy/audio_parser.py',
        '-p', pitch_distance,
        '-f', duration_factor,
        '-g', duration_gap,
        '-a', alpha,
    ];
    console.log(args);
    if (allow_transposition)
        args.push('-t');

    if (contour_match)
        args.push('-C');

    if (collection != null) {
        args.push('-c');
        args.push(collection);
    }
    let pyParserWrite = spawn('python3', args);

    // Get the data
    let allData = '';
    pyParserWrite.stdout.on('data', data => {
        log('info', `/formulateQuery: received data (${data.length} bytes) from python script.`);
        allData += data.toString();
    });

    // log stderr
    let errors = [];
    pyParserWrite.stderr.on('data', data => {
        let e = handlePythonStdErr('/formulateQuery', data);

        if (e != null)
            errors.push(e);
    });

    // Send the data to the client
    pyParserWrite.stdout.on('close', () => {
        log('info', `/formulateQuery: connection closed.`);

        if (errors.length > 0)
            return res.json({ error: errors.slice(-1)[0] });

        return res.json({ query: allData });
    });
});

/**
 * This endpoint sends a fuzzy query and process its results.
 *
 * Data to post : `{'query': some_fuzzy_query, 'format': f}`, where f is 'json' or 'text'.
 *
 * Returns `{results: json[]}`
 *
 * POST
 *
 * @constant /fuzzy-query
 */
app.post('/fuzzy-query', async (req, res) => {
    const query = req.body.query;
    try {
        // Prevent DB edits
        if (queryEditsDB(query)) {
            log('info', `/fuzzy-query: Operation not allowed.`);
            return res.json({ error: 'Operation not allowed.' });
        }
        log('info', `/fuzzy-query: forwarding to Flask.`);

        const response = await fetch('http://localhost:5000/execute-fuzzy-query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: query,
                format: 'json',
                uri: uri,
                user: user,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            return res.status(400).json({ error: data.error || 'Flask returned an error' });
        }

        // Format result like original logic
        return res.json({ results: data.result || '[]' });

    } catch (err) {
        console.error(`/fuzzy-query: error`, err);
        return res.status(500).json({ error: 'Internal server error contacting Flask' });
    }
});

app.listen(port, () => {
    log('info', `Server listening on port ${port}`)
})