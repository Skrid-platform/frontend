\version "2.22.2"
% automatically converted by musicxml2ly from Air_n_120_g.musicxml
\pointAndClickOff

\header {
    title =  "Air n 120"
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
PartPOneVoiceOne =  \relative bes' {
    \repeat volta 2 {
        \clef "treble" \time 2/4 \key f \major \partial 8 bes8
        | % 1
        a8 [ g8 ] bes4 | % 2
        g4 f8 [ f8 ] | % 3
        g8 [ bes8 ] a8 [ g8 ] | % 4
        bes4 g4 | % 5
        \time 3/8  f8 [ f8 ] g8 }
    \repeat volta 2 {
        | % 6
        \time 1/8  g8 | % 7
        \time 2/4  d8 [ e8 ] f8 [ d8 ] | % 8
        g4 f8 [ bes8 ] | % 9
        a8 [ g8 ] a8 [ a8 ] \break |
        \barNumberCheck #10
        d,8 [ e8 ] f8 [ d8 ] | % 11
        g4 f8 [ bes8 ] | % 12
        \time 3/8  a8 [ a8 ] g8 \bar "|."
        }
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

