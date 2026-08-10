Place the background wedding instrumental track here as:

  wedding-instrumental.mp3

The MusicToggle component (src/components/MusicToggle.tsx) references
/audio/wedding-instrumental.mp3. Music never autoplays; it only starts when
the visitor taps the button. Until a real file is added here, tapping the
button will simply fail to play (silently) rather than error the page.
