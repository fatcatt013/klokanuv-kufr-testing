# TODO remove once not needed
# this file is not used (and should not be used) for any automated data processing
# just for easy developers extraction of data about assessment_type_options from data in database
# output of this needs to be still checked and formatted
# careful about "ukáže na formátu / pojmenuje" - needs to be split 

SELECT
    assessment_type_id,
    SUBSTR(label, 0, INSTR(label, '/')-1) as first_column
from
    record_sheet_task rst
    join record_sheet_assessmenttype rsa
        on rst.assessment_type_id = rsa.id
group by
    assessment_type_id
UNION
SELECT
    assessment_type_id,
    SUBSTR(label, INSTR(label, '/')+1, INSTR(SUBSTR(label, INSTR(label, '/')+1, LENGTH(label)-INSTR(label, '/')), '/')-2) as second_column
from 
    record_sheet_task rst
    join
        record_sheet_assessmenttype rsa
            on rst.assessment_type_id = rsa.id
group by
    assessment_type_id
UNION
SELECT
    assessment_type_id,
    SUBSTR(SUBSTR(label, INSTR(label, '/')+1, LENGTH(label)-INSTR(label, '/')), INSTR(SUBSTR(label, INSTR(label, '/')+1, LENGTH(label)-INSTR(label, '/')), '/')+1, LENGTH(label)) as third_column
from
    record_sheet_task rst
    join record_sheet_assessmenttype rsa
        on rst.assessment_type_id = rsa.id
group by
    assessment_type_id
;
