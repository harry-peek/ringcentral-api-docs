# How to analyze media files using the AI API

!!! important "`Deprecated`"

Most of RingCentral AI APIs such as the `/speech-to-text` and the `/analyze-interaction` endpoints take the input media content `contentUri` as a URI link to a media file resides at a remote server. These APIs all work in an [asynchronous manner](asynchronous-responses.md) and follow this basic flow:

1. Developer calls an API endpoint passing a URI in the `contentUri` parameter
2. RingCentral responds with a 20x status code to acknowledge receipt of request
3. RingCentral downloads and processes media file
4. RingCentral posts a response back to the specified webhook URL in the API request

The URI link referenced by the `contentUri` parameter must be publicly accessible. If a media file access is protected in some way, then the file must be retrievable and accessible via a single URI (see the case of RingCentral call recording example below). Otherwise, RingCentral will fail the API request and post an error to the asynchronous response. The AI API does not currently allow developers to specify custom HTTP headers to be transmitted when fetching the media content from the `contentUri` URI.

## How to analyze RingCentral call recordings and meeting recordings

RingCentral hosts all downloadable [media content](../basics/media.md) on a protected server, and requires developers to provide a valid access token in a request in order to access the content. RingCentral makes it possible to access protected media content, like RingCentral [call recordings](../voice/call-log/recordings.md) and RingCentral Video [meeting recordings](../video/api/meeting-history.md) by appending the access token via the `access_token` query parameter. For example, let's look at how one would construct a URL that would allow the AI API to access a RingCentral call recording.

### Sample call log entry

Here is an excerpt from a call to the [Call Log API](../voice/call-log/index.md) and shows an entry that contains a reference to a recording of a phone call.

```json hl_lines="24"
--8<-- "code-samples/voice/call-log-sample.json"
```

## Sample code to construct a content URI for accessing RingCentral call recording

The following example code shows how to obtain the access token using a RingCentral platform SDK and attach the access token to the media file's content URL.

!!! note "Running the code"
    * Edit the variables in ALL CAPS with your app and user credentials before running the code.

=== "JavaScript"

    ```javascript
    --8<-- "code-samples/ai/code-snippets-headers/header.js"
    --8<-- "code-samples/ai/code-snippets/access-token.js:10:"
    ```

=== "Python"

    ```python
    --8<-- "code-samples/ai/code-snippets/access-token.py"
    --8<-- "code-samples/ai/code-snippets-headers/footer.py:1:5"
    ```

=== "PHP"

    ```php
    --8<-- "code-samples/ai/code-snippets-headers/header.php:1:9"
    --8<-- "code-samples/ai/code-snippets/access-token.php:2:"
    ```

=== "Ruby"

    ```ruby
    --8<-- "code-samples/ai/code-snippets/access-token.rb"
    --8<-- "code-samples/ai/code-snippets-headers/footer.rb:1:4"
    ```    

=== "C#"

    ```c#
    --8<-- "code-samples/ai/code-snippets/access-token.cs"
    ```

=== "Java"

    ```java
    --8<-- "code-samples/ai/code-snippets/access-token.java"
    ```

!!! Important
    To retrieve the recording and use the AI API to process the recording, you need to have the following app permissions:

    For Call Recordings: **AI**, **Read Call Log**, **Read Call Recording**

    For Video Meeting Recordings: **AI**, **Video**
