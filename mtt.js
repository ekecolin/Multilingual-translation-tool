// If using my code provide credit, thank you
// Initial setup and UI for the translation tool
const deepLURL = "https://api-free.deepl.com";  // Example URL for DeepL API
const googleTranslateURL = "https://translate.googleapis.com"; // Example URL for Google Translate API

// Default API keys (these should be input securely in practice)
let apiKeyDeepL = "";
let apiKeyGoogle = "";

// Setup page styles
$('body').css("margin", "20px");
$('body').css("padding", "20px");

// Setup page styles
$('body').css({
    "margin": "20px",
    "padding": "20px",
    "font-family": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    "background-color": "#f7f9fc",
    "color": "#333"
});

$('button').css({
    "background-color": "#4CAF50",
    "color": "white",
    "border": "none",
    "padding": "10px 20px",
    "text-align": "center",
    "font-size": "16px",
    "margin": "4px 2px",
    "cursor": "pointer",
    "border-radius": "5px",
    "transition": "background-color 0.3s"
});

$('button').hover(function() {
    $(this).css("background-color", "#45a049");
}, function() {
    $(this).css("background-color", "#4CAF50");
});

$('textarea, input, select').css({
    "padding": "10px",
    "border": "1px solid #ccc",
    "border-radius": "5px",
    "box-shadow": "0 2px 4px rgba(0, 0, 0, 0.1)",
    "margin-bottom": "10px",
    "width": "calc(100% - 24px)"
});

document.write(`
    <h1 style="color: #2c3e50; text-align: center;">Multilingual Translation Tool</h1>
    <p style="text-align: center; color: #6c757d;">Simply enter your API keys and begin to type your text. Translations are displayed side-by-side. You can choose which translation you prefer.</p>

    <div id="apiKeyInput" style="margin-bottom: 20px; padding: 15px; background-color: #e8f0fe; border-radius: 10px;">
        <h3>Instructions for entering API keys</h3>
        <p>To use this translation tool, you will need an API key from DeepL and Google Translate.</p>
        <ul>
            <li>Register and get your DeepL API key <a href='https://www.deepl.com/en/your-account/keys' style="color: #2c3e50;">here</a>.</li>
            <li>Get your Google API key by following the instructions <a href='https://cloud.google.com/apis/docs/getting-started' style="color: #2c3e50;">here</a>.</li>
        </ul>
        <h4>Enter API keys</h4>
        DeepL API key: <input style="width:30vw;" maxlength="200" id="apiKeyDeepL" value=""><br>
        Google Translate API key: <input style="width:30vw;" maxlength="200" id="apiKeyGoogle" value=""><br>
        <button onclick="setApiKeys();" class="ab-normbutton">Set API keys</button>
    </div>

    <div style="margin-bottom: 20px;">
        <h3>Enter text to translate</h3>
        <textarea id="textInput" rows="4" cols="50" placeholder="Enter text here..."></textarea>
    </div>

    <div style="margin-bottom: 20px;">
        <h3>Select target language</h3>
        <select id="targetLanguage">
            <option value="zh">Chinese</option>
            <option value="nl">Dutch</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="es">Spanish</option>
            <option value="tr">Turkish</option>
        </select>
        <button onclick="sendTranslationRequest();" class="ab-normbutton">Translate</button>
    </div>

    <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
        <h4>API Responses</h4>
        <div style="margin-bottom: 20px;">
            <h5>DeepL Response</h5>
            <div id="deepLResponse" style="padding: 10px; background-color: #f1f8ff; border-radius: 5px;"></div>
        </div>
        <div>
            <h5>Google Translate Response</h5>
            <div id="googleResponse" style="padding: 10px; background-color: #f1f8ff; border-radius: 5px;"></div>
        </div>
    </div>

    <div style="margin-bottom: 20px;">
        <h3>Feedback Section</h3>
        <p>Which translation do you prefer?</p>
        <input type="radio" name="feedback" value="DeepL" id="feedbackDeepL"> DeepL<br>
        <input type="radio" name="feedback" value="Google" id="feedbackGoogle"> Google Translate<br>
        <button onclick="submitFeedback();" class="ab-normbutton">Submit Feedback</button>
    </div>
`);

function setApiKeys() {
    apiKeyDeepL = $("#apiKeyDeepL").val().trim();
    apiKeyGoogle = $("#apiKeyGoogle").val().trim();

    if (!apiKeyDeepL || !apiKeyGoogle) {
        alert("Please enter valid API keys.");
        return;
    }

    $("#apiKeyInput").html("<b>API keys have been set.</b>");
}

function sendTranslationRequest() {
    const text = $("#textInput").val();
    const targetLang = $("#targetLanguage").val();

    if (!text) {
        alert("Please enter text to translate.");
        return;
    }

    // Reset previous responses
    $("#deepLResponse").html("");
    $("#googleResponse").html("");

    // DeepL API request (replace with your API endpoint)
    $.ajax({
        type: "POST",
        url: "https://api-free.deepl.com/v2/translate", // Correct DeepL API endpoint
        contentType: "application/x-www-form-urlencoded",
        data: {
            auth_key: apiKeyDeepL,
            text: text,
            target_lang: targetLang
        },
        success: function(data) {
            $("#deepLResponse").html(data.translations[0].text);
        },
        error: function() {
            $("#deepLResponse").html("<font color='red'><b>Error with DeepL API.</b></font>");
        }
    });

    // Google Translate API request (corrected endpoint)
    $.ajax({
        type: "POST",
        url: `https://translation.googleapis.com/language/translate/v2?q=${encodeURIComponent(text)}&target=${targetLang}&key=${apiKeyGoogle}`, // Correct Google Translate API endpoint
        contentType: "application/json",
        data: JSON.stringify({
            q: text,
            target: targetLang,
            key: apiKeyGoogle
        }),
        success: function(response) {
            $("#googleResponse").html(response.data.translations[0].translatedText);
        },
        error: function() {
            $("#googleResponse").html("<font color='red'><b>Error with Google Translate API.</b></font>");
        }
    });
}

function submitFeedback() {
    const feedback = $("input[name='feedback']:checked").val();
    if (feedback) {
        // Display the feedback in a notification banner instead of just an alert
        const notification = `
            <div id="feedbackNotification" style="position:fixed; top:20px; right:20px; background-color:#d4edda; color:#155724; padding:15px; border-radius:5px; border:1px solid #c3e6cb; z-index:1000;">
                Thank you for your feedback! You preferred: <strong>${feedback}</strong>
            </div>
        `;

        // Append the notification to the body
        $('body').append(notification);

        // Remove the notification after 3 seconds
        setTimeout(() => {
            $('#feedbackNotification').fadeOut(500, function() {
                $(this).remove();
            });
        }, 3000);
    } else {
        alert("Please select a translation to provide feedback.");
    }
}
