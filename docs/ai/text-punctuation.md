# Text punctuation

!!! important "`Deprecated`"

The Text Punctuation API takes a list of text blocks and augments them with proper punctuation using artificial intelligence. The same feature is applied to the [speech recognition API's](speech-to-text.md) output if the `enablePunctuation` flag is set. The API will augment text with the following punctuation:

* Periods, full-stop: `.`
* Commas: `,`
* Quotes: `'` `"`
* Question marks: `?`
* Exclamation marks: `!`
* Apostrophes: `'`, contractions and possessive forms
* Proper capitalization, sentence-cap and acronyms

## Augmenting text with proper punctuation

### Request parameters

| Parameter | Type        | Description                     |
| --------- | ----------- | ------------------------------- |
| `texts`   | List        | List of unformatted text blobs. |

### Sample code

The following example code shows how to provide the text paragraphs to the API and get the texts grammarly punctuated.

Follow the instructions on the [quick start](quick-start.md) section to setup and run your server code before running the sample code below.

!!! note "Running the code"
    * Edit the variables in ALL CAPS with your app and user credentials before running the code.
    * You can only run on your production account, this means that you have to use app credentials for production.

=== "JavaScript"

    ```javascript
    --8<-- "code-samples/ai/code-snippets-headers/header.js:1:12"
    --8<-- "code-samples/ai/code-snippets/punctuation.js:10:"
    ```

=== "Python"

    ```python
    --8<-- "code-samples/ai/code-snippets/punctuation.py"
    --8<-- "code-samples/ai/code-snippets-headers/footer.py:1:5"
    ```

=== "PHP"

    ```php
    --8<-- "code-samples/ai/code-snippets-headers/header.php:1:9"
    --8<-- "code-samples/ai/code-snippets/punctuation.php:2:"
    ```

=== "Ruby"

    ```ruby
    --8<-- "code-samples/ai/code-snippets/punctuation.rb"
    --8<-- "code-samples/ai/code-snippets-headers/footer.rb:1:4"
    ```    

=== "C#"

    ```c#
    --8<-- "code-samples/ai/code-snippets/punctuation.cs"
    ```

=== "Java"

    ```java
    --8<-- "code-samples/ai/code-snippets/punctuation.java"
    ```

### Sample response

```json
--8<-- "code-samples/ai/punctuate-response.json"
```
