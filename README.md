## Inspiration
We want to connect people with the help of AI. One aspect where this can help, is communication with people who speak a foreign language. While there are already ways to translate, like google translate, those often only work good for single words or simple sentences. Once the information gets more complex, mistakes are common and meaning can get lost in translation. One of the best neural machine translation services out there is **DeepL**. Launched in 2017 it got praised by many for its accurate translation. It’s perfect for our purpose. On the other hand, we got **AssemblyAI**, a power tool as well. Allowing you to transcribe what you say, even when you just speak naturally. Our projects combines both services, to offer instant translation, simply by normally talking into your microphone. No need to write down anything, upload text files etc.

## What it does
Our website combines the power of AssemblyAI and DeepL to provide users a seamless and effortless way to translate. They can naturally speak in their native language and receive a proper translation in the selected language. First they select their native language (9 supported), then the target language (29 supported). Once they push the microphone button, AssemblyAI will listen to their voice and transcribe everything.  After they finish talking, the string gets passed to DeepL and translated through their neural network. We finally display the translated string on our website.

Supported input languages:

- English
- French
- German
- Spanish
- Hindi
- Italian
- Portuguese
- Dutch
- Japanese

Supported output languages:

- Bulgarian
- Chinese (Simplified)
- Czech
- Danish
- Dutch
- English (American and British)
- Estonian
- Finnish
- French
- German
- Greek
- Hungarian
- Indonesian
- Italian
- Japanese
- Latvian
- Lithuanian
- Polish
- Portuguese (Brazilian and European)
- Romanian
- Russian
- Slovak
- Slovene
- Spanish
- Swedish
- Turkish
- Ukrainian


## How we built it
We started out by designing a landing page, to give a good overview of our project. We then went onto the actual application, by first implementing AssemblyAI and receiving a string of what we just said. Once everything worked smoothly, we passed this string to DeepL, using their API. We finally received back the translated string and put it on display on our site. The last part was to further improve the UI and allow for more custom option. Part of that was to give the user the option to decide between a more formal and informal translation. 

## Explore Ideas
We have already started to provide more flexibility while translating, by implementing the decision between complex and less complex writing styles when translating. We also added the option to censor bad language and now started to work with **Co:here**. We want to allow as many people as possible to play around with different AI systems. So now people who are not fluent in English can simply write a prompt in their native language and still enjoy the benefits. But this is just the start, as we want to make all AIs accessibly that way. 

## What's next for Eloquent
There is a whole set of use cases where we see Eloquent being implemented. 
1)	Allow our website to translate in real time, while the user is still talking
2)    Gradually implement more AIs, making them accessibly for non-natives (in English)
3)	We will implement Eloquent in discord to allow for people to seamlessly talk to each other
4)	A dedicated chat on our website for two or more users
