\version "2.22.2"
% automatically converted by musicxml2ly from Air_n_129_g.musicxml
\pointAndClickOff

\header {
    title =  "Air n 129"
    composer =  "Collecté par Joseph Mahe, 1825"
    encodingsoftware =  "MuseScore 2.2.1"
    encodingdate =  "2023-03-21"
    encoder =  "Gwenael Piel et Virginie Thion (IRISA, France)"
    source = 
    "Essai sur les Antiquites du departement du Morbihan, Joseph Mahe, 1825"
    }

#(set-global-staff-size 20.158742857142858)
\paper {
    
    paper-width = 21.01\cm
    paper-height = 29.69\cm
    top-margin = 1.0\cm
    bottom-margin = 2.0\cm
    left-margin = 1.0\cm
    right-margin = 1.0\cm
    indent = 1.6161538461538463\cm
    short-indent = 1.292923076923077\cm
    }
\layout {
    \context { \Score
        autoBeaming = ##f
        }
    }
PartPOneVoiceOne =  \relative g' {
    \repeat volta 2 {
        \clef "treble" \time 6/8 \key bes \major | % 1
        g4 g8 g4 a8 | % 2
        bes4 c8 d4. | % 3
        d4 d8 es4 d8 | % 4
        c4 d8 bes4 a8 }
    | % 5
    a4 c8 \grace { c8 } bes4. | % 6
    a4 g8 \grace { bes8 } a4. | % 7
    d,4 g8 f4 g8 \break | % 8
    a8 [ bes8 c8 ] bes4
    a8 | % 9
    a4 c8 \grace { c8 } bes4. |
    \barNumberCheck #10
    a4 g8 \grace { bes8 } a4. | % 11
    d,4 g8 f4 g8 | % 12
    a8 [ bes8 a8 ] g4. \bar "|."
    }


% The score definition
\score {
    <<
        
        \new Staff
        <<
            \set Staff.instrumentName = "Piano"
            \set Staff.shortInstrumentName = "Pno."
            
            \context Staff << 
                \mergeDifferentlyDottedOn\mergeDifferentlyHeadedOn
                \context Voice = "PartPOneVoiceOne" {  \PartPOneVoiceOne }
                >>
            >>
        
        >>
    \layout {}
    % To create MIDI output, uncomment the following line:
    %  \midi {\tempo 4 = 100 }
    }

