  GNU nano 2.4.2                                                           File: .git/hooks/pre-push.sample

#!/bin/bash

RESULT=0

function runLinter () {
    LINTERCOMMAND=$(eslint ../source/javascript/**)

    if [ LINTERCOMMAND != "" ]; then
        RESULT=1
    fi
}

runLinter

exit $RESULT


