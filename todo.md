Tomorrow:

- [x] end call from the UI
- [x] recording of call link
- [x] anonymous call
- [x] handle not picking up calls properly
- [] improve AI
- [x] show ringing status
- [] set up international calling
- [x] deploy frontend
- [x] deploy backend
- [] set up backend firewall
- [x] fix initial lag
- [x] remove submit from phone verification
- [] figure out backend ec2 instance pricing

Bugs:

- [] verification code cache doesn't work
- [] response to initial hello is slow
- [x] phone verification / user onboarding breaks because of firebase DocumentReference
- [x] start on Main screen and then authenticate if not anonymous

core infra:

- speech to text: need to see if we can integrate Assembly AI, what if we could do Whisper as well?

  - generally I think we just stick with google and beef it up
  - a big problem here is latency from when google thinks the message is final — we had some ideas to maybe try to respond to interim results?
    - google exposes a stability parameter — maybe at the cost of accuracy we pick a threshold that make it transcribe just a little faster. this requires extra infra to carry around a flag if we're on a new utterance yet.

- LLM: is not great. would be great to integrate with Anthropic which is actually a chatbot API. but also we can maybe try the intent classification route

  - this is probably the largest source of latency

- text to speech: we can train on top of the your-tts model on particular voices. the few-shot learning is actually pretty decent — this is a cool gimmick that's fun for demos.

  - a problem here is getting this set up on EC2 — there's problems with setting up torch on my t2.micro, but we could just beef up the instance
  - wonder if using an API is just the move here for now

    - like tortoise-TTS: https://github.com/metavoicexyz/tortoise-tts

  - we also need to limit the response length or chunk the output text into sentences. it takes a while to synthesize the full response.
