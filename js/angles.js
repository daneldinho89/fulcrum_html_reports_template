/****************************************************************
 * --------------------------------------------------------------
 * ANGLES.js
 * CREATED BY: DANE WILLIAMSON
 * LAST UPDATE: 06 APR 2023
 * --------------------------------------------------------------
 * V1.0:
 *      RELEASE DATE:       06 APR 2023     
 * 
 *      CORE FUNCTIONS:     row_names()
 *                          qualifier_names()
 *                          attribute_names()
 *                          row_categories()
 *                          row_names_in_category()
 *                          row_names_in_colour()
 *                          qualifier_categories()
 *                          qualifier_names_in_category()
 *                          attribute_categories()
 *                          attribute_names_in_category()
 *                          clip_extract()
 *                          read_config_variables()
 * 
 *      CALC FUNCTIONS:     count_clips()
 *                          count_qualifiers()
 *                          count_qualifier_patterns()
 *                          count_attributes()
 *                          sum_clip_durations()
 *                          all_row_durations()
 *                          count_clips_table()
 * 
 *      VIZ FUNCTIONS:      create_data_table()
 *                          create_data_card()
 *                          create_success_donut()
 *                          create_contest_bar()
 *                          create_bootstrap_grid()
 *                          create_update_button()
 *                          create_text()
 *                          create_image()
 *                          create_config_content()
 * 
 *      MISC FUNCTIONS:     uniqueArray()
 *                          percentage()
 *                          send_to_clipboard()
 *                          sort_table()
 *                          time_now()
 *                          make_html_ready()
 *                          radians()
 * 
 *      COMING SOON:        create_bar_chart()
 *                          create_pie_chart()
 *                          create_scatter_chart()
 *                          create_line_chart()
 * 
 * --------------------------------------------------------------
****************************************************************/

/****************************************************************
 * --------------------------------------------------------------
 * CORE FUNCTIONS -----------------------------------------------
 * --------------------------------------------------------------
****************************************************************/

/****************************************************************
* ROW NAMES
* ---------------------------------------------------------------
* Function to return an array of row_names in the timeline
* (already unique)
****************************************************************/
function row_names(data) {
    let all_rows = [];
    for (row of data.rows) {
        all_rows.push(row.row_name)
    };
    return all_rows;
};

/****************************************************************
* QUALIFIER NAMES
* ---------------------------------------------------------------
* Function to return an array unique qualifiers in the timeline
****************************************************************/
function qualifier_names(data) {
    let qualifier_names = [];
    // Loop through each row
    for (row of data.rows) {
        // Check if any clips exists for the given row
        if ("clips" in row) {for (clip of row.clips) {
            // Check if any qualifiers exists for the given clip
            if ("qualifiers" in clip) {
                    // Loop through each qualifier
                    for (qualifier of clip.qualifiers.qualifiers_array) {
                        // add qualifier name to the array
                        qualifier_names.push(qualifier.name);
                    };
                };
            };
        };
    };
    // Remove duplicate names from the array
    return uniqueArray(qualifier_names);
};

/****************************************************************
* ATTRIBUTE NAMES
* ---------------------------------------------------------------
* Function to return an array unique attributes in the timeline
****************************************************************/
function attribute_names(data) {
    let attribute_names = [];
    // Loop through each row
    for (row of data.rows) {
        // Check if any clips exists for the given row
        if ("clips" in row) {for (clip of row.clips) {
            // Check if any qualifiers exists for the given clip
            if ("qualifiers" in clip) { for (qualifier of clip.qualifiers.qualifiers_array) {
                if ("qualifier_attributes" in qualifier) { for (attribute of qualifier.qualifier_attributes) {
                    // add attribute name to the array    
                    attribute_names.push(attribute.name);
                    };};
            };};
        };};
    };
    // Remove duplicate names from the array
    return uniqueArray(attribute_names);
};

/****************************************************************
* ROW CATEGORIES
* ---------------------------------------------------------------
* Function to return an array unique row/clip categories in the timeline
* NOT IN USE as json does not currently export the clip category yet (June 2022)
****************************************************************/
function row_categories(data) {
    let row_categories = [];
    // Loop through each row
    for (row of data.rows) {
        // Check if any clips exists for the given row
        if ("clips" in row) {for (clip of row.clips) {
            // Push the category to the array
            row_categories.push(clip.category);
            };
        };
    };
    // Remove duplicate names from the array
    return uniqueArray(row_categories);
};

/****************************************************************
* ROW NAMES IN CATEGORY
* ---------------------------------------------------------------
* Function to return an array unique rows in the timeline
* based upon a defined category name
****************************************************************/
function row_names_in_category(data, category) {
    let row_names = [];
    // Loop through each row
    for (row of data.rows) {
        // Check if any clips exists for the given row
        if ("clips" in row && row.row_category == category) {
            row_names.push(row.row_name)
        };
    };
    // Remove duplicate names from the array
    return uniqueArray(row_names);
};

/****************************************************************
* ROW NAMES IN COLOUR
* ---------------------------------------------------------------
* Function to return an array unique rows in the timeline
* based upon a defined row colour
****************************************************************/
function row_names_in_colour(data, colour) {
    let row_names = [];
    // Loop through each row
    for (row of data.rows) {
        // Check if color is correct and if any clips exists for the given row
        if (row.color == colour && "clips" in row) {
            row_names.push(row.row_name)
        };
    };
    // Remove duplicate names from the array
    return uniqueArray(row_names);
};

/****************************************************************
* QUALIFIER CATEGORIES
* ---------------------------------------------------------------
* Function to return an array unique qualifier categories in the timeline
****************************************************************/
function qualifier_categories(data) {
    let qualifier_categories = [];
    // Loop through each row
    for (row of data.rows) {
        // Check if any clips exists for the given row
        if ("clips" in row) {for (clip of row.clips) {
            // Check if any qualifiers exists for the given clip
            if ("qualifiers" in clip) {
                    // Loop through each qualifier
                    for (qualifier of clip.qualifiers.qualifiers_array) {
                        // add qualifier name to the array
                        qualifier_categories.push(qualifier.category);
                    };
                };
            };
        };
    };
    // Remove duplicate names from the array
    return uniqueArray(qualifier_categories);
};

/****************************************************************
* QUALIFIER NAMES IN CATEGORY
* ---------------------------------------------------------------
* Function to return an array unique qualifiers in the timeline
* based upon a defined category name
****************************************************************/
function qualifier_names_in_category(data, category) {
    let qualifier_names = [];
    // Loop through each row
    for (row of data.rows) {
        // Check if any clips exists for the given row
        if ("clips" in row) {for (clip of row.clips) {
            // Check if any qualifiers exists for the given clip
            if ("qualifiers" in clip) {
                    // Loop through each qualifier
                    for (qualifier of clip.qualifiers.qualifiers_array) {
                        // add qualifier name to the array
                        if (qualifier.category == category) {
                            qualifier_names.push(qualifier.name);
                        }
                    };
                };
            };
        };
    };
    // Remove duplicate names from the array
    return uniqueArray(qualifier_names);
};

/****************************************************************
* ATTRIBUTE CATEGORIES
* ---------------------------------------------------------------
* Function to return an array unique attribute categories in
* the timeline
****************************************************************/
function attribute_categories(data) {
    let attribute_categories = [];
    // Loop through each row
    for (row of data.rows) {
        // Check if any clips exists for the given row
        if ("clips" in row) {for (clip of row.clips) {
            // Check if any qualifiers exists for the given clip
            if ("qualifiers" in clip) { for (qualifier of clip.qualifiers.qualifiers_array) {
                // Check if any attributes exists for the given qualifier
                if ("qualifier_attributes" in qualifier) { for (attribute of qualifier.qualifier_attributes) {
                    // add attribute name to the array    
                    attribute_categories.push(attribute.category);
                    };};
            };};
        };};
    };
    // Remove duplicate names from the array
    return uniqueArray(attribute_categories);
};

/****************************************************************
* ATTRIBUTE NAMES IN CATEGORY
* ---------------------------------------------------------------
* Function to return an array unique attributes in the timeline
* based upon a defined category name
****************************************************************/
function attribute_names_in_category(data, category) {
    let attribute_names = [];
    // Loop through each row
    for (row of data.rows) {
        // Check if any clips exists for the given row
        if ("clips" in row) {for (clip of row.clips) {
            // Check if any qualifiers exists for the given clip
            if ("qualifiers" in clip) { for (qualifier of clip.qualifiers.qualifiers_array) {
                // Check if any attributes exists for the given qualifier
                if ("qualifier_attributes" in qualifier) { for (attribute of qualifier.qualifier_attributes) {
                    // add attribute name to the array    
                    if (attribute.category == category) {
                        attribute_names.push(attribute.name);
                    }
                };};
            };};
            };
        };
    };
    // Remove duplicate names from the array
    return uniqueArray(attribute_names);
};

/****************************************************************
* CLIP EXTRACT
* ---------------------------------------------------------------
* Function to return an array of clip details such as time_start
****************************************************************/
function clip_extract(data, clip_row_name = "", detail = "") {
    let clip_details = [];
    for (row of data.rows) {
        // If a specific row name is provided and doesn't match the current row, skip this row.
        if (clip_row_name !== "" && row.row_name !== clip_row_name) continue;
        
        // If the row does not have any clips, skip to the next row
        if (!row.clips) continue;
        
        for (clip of row.clips) {
            // if there are no details for the clip skip to next clip
            if (!clip[detail]) continue;
            clip_details.push(clip[detail])
        }
    };

    return clip_details;
};


/****************************************************************
 * --------------------------------------------------------------
 * CALC FUNCTIONS -----------------------------------------------
 * --------------------------------------------------------------
****************************************************************/

/****************************************************************
* COUNT CLIPS
* ---------------------------------------------------------------
* Function to return the number of clips which match the row name
* and specific search criteria array. The search criteria can
* include an array of qualifiers and attributes like this:
* count_clips(data, "row_name", [
*                        {qualifier_category:qualifier_name}
*                        , {qualifier_category:qualifier_name,
*                                attributes: {attr_cat:attr_name}}
*                    ])
*
****************************************************************/
function count_clips(data, clip_row_name = "", search_criteria = [], time_start = 0, time_end = Infinity, row_cat = "") {
    let clip_count = 0;

    // Iterate through each row in the dataset
    for (const row of data.rows) {
        // Check for row name and category constraints
        if ((clip_row_name !== "" && row.row_name !== clip_row_name) || (row_cat !== "" && row.row_category !== row_cat)) continue;
        // Skip rows without clips
        if (!row.clips) continue;

        // Iterate through each clip in the row
        for (const clip of row.clips) {
            // Check if clip falls within the specified time range
            if (clip.time_start < time_start || clip.time_start > time_end) continue;

            // Process only if there are search criteria defined
            if (search_criteria.length > 0) {
                // Skip clips without qualifiers
                if (!clip.qualifiers || !clip.qualifiers.qualifiers_array) continue;

                let matched_criteria_count = 0;

                // Iterate through each search criteria
                for (const criteria of search_criteria) {
                    const category = Object.keys(criteria)[0] || "";
                    const value = criteria[category] || "";
                    const attributes = criteria.attributes || {};

                    // Iterate through each qualifier in the clip
                    for (const qualifier of clip.qualifiers.qualifiers_array) {
                        // Check for category and name matches, allowing for unspecified (any) matches
                        const categoryMatch = category === "" || qualifier.category === category;
                        const valueMatch = value === "" || qualifier.name === value;

                        if (categoryMatch && valueMatch) {
                            // If there are attributes in the criteria
                            if (Object.keys(attributes).length > 0) {
                                if (!qualifier.qualifier_attributes) continue;

                                let attribute_match_count = 0;
                                // Iterate through each attribute in the qualifier
                                for (const attribute of qualifier.qualifier_attributes) {
                                    // Check each specified attribute against qualifier attributes
                                    for (const [attr_category, attr_value] of Object.entries(attributes)) {
                                        const attributeCatMatch = attr_category === "" || attribute.category === attr_category;
                                        const attributeNameMatch = attribute.name === attr_value;

                                        // Count matches for attributes
                                        if (attributeCatMatch && attributeNameMatch) {
                                            attribute_match_count++;
                                        }
                                    }
                                }

                                // If all specified attributes match, increment the criteria match count
                                if (attribute_match_count === Object.keys(attributes).length) {
                                    matched_criteria_count++;
                                    break;
                                }
                            } else {
                                // Increment matched criteria count if there are no additional attribute criteria
                                matched_criteria_count++;
                                break;
                            }
                        }
                    }
                }

                // Only count the clip if it matches all the search criteria
                if (matched_criteria_count >= search_criteria.length) {
                    clip_count++;
                    console.log("Clip UUID:", clip.uuid, "| Clip Cumulative Total:", clip_count);
                }
            } else {
                // If no search criteria, count all clips
                clip_count++;
            }
        }
    }

    // Log the total count with additional information
    console.log(clip_row_name + ": " + clip_count + " clips | Search Criteria: " + JSON.stringify(search_criteria));

    return clip_count;
}



/****************************************************************
* COUNT QUALIFIERS
* ---------------------------------------------------------------
* Function to return the number of qualifiers which appear in
* clips which match the row name and the specific search criteria
* array. The search criteria can include an array of qualifiers
* and attributes like this:
* count_qualifiers(data, "row_name", [
*                        {qualifier_category:qualifier_name}
*                        , {qualifier_category:qualifier_name,
*                                attributes: {attr_cat:attr_name}}
*                    ])
*
****************************************************************/
function count_qualifiers(data, clip_row_name = "", search_criteria = [], time_start = 0, time_end = Infinity) {
    let total_qualifier_count = 0;

    // Iterate through each search criterion
    for (const criteria of search_criteria) {
        let qualifier_count = 0;

        // Iterate through each row in the data set
        for (const row of data.rows) {
            if (clip_row_name !== "" && row.row_name !== clip_row_name) continue;

            const clips = row.clips || [];

            // Iterate through each clip in the row
            for (const clip of clips) {
                if (clip.time_start < time_start || clip.time_end > time_end) continue;

                const qualifiers = clip.qualifiers?.qualifiers_array || [];

                // Iterate through each qualifier in the clip
                for (const qualifier of qualifiers) {
                    if (qualifier.time < time_start || qualifier.time > time_end) continue;

                    // Optional: Check if qualifier category and name are part of the search criteria
                    const category = criteria.category || "";
                    const value = criteria.name || "";

                    // Determine if there's a match on category and name
                    const categoryMatch = category === "" || qualifier.category === category;
                    const nameMatch = value === "" || qualifier.name === value;

                    if (categoryMatch && nameMatch) {
                        let attribute_match_count = 0;

                        // Check if attributes match the search criteria
                        const attributes = criteria.attributes || {};
                        if (Object.keys(attributes).length > 0 && qualifier.qualifier_attributes) {
                            // Iterate through each attribute in the qualifier
                            for (const attribute of qualifier.qualifier_attributes) {
                                // Check each specified attribute against qualifier attributes
                                for (const [attr_category, attr_value] of Object.entries(attributes)) {
                                    const attributeCatMatch = attr_category === "" || attribute.category === attr_category;
                                    const attributeNameMatch = attribute.name === attr_value;

                                    // Count matches for attributes
                                    if (attributeCatMatch && attributeNameMatch) {
                                        attribute_match_count++;
                                    }
                                }
                            }
                        }

                        // If all attributes match, increment the qualifier count for the current criteria
                        if (attribute_match_count === Object.keys(attributes).length) {
                            qualifier_count++;
                        }
                    }
                }
            }
        }

        // Add the count for the current criteria to the total count
        total_qualifier_count += qualifier_count;
    }

    // Log the total count with additional information
    console.log(clip_row_name + ": " + total_qualifier_count + " qualifiers | Search Criteria: " + JSON.stringify(search_criteria));

    return total_qualifier_count;
}

/****************************************************************
* COUNT QUALIFIER PATTERNS
* ---------------------------------------------------------------
* Function to return the number of occurences of a qualifier
* sequence or "pattern" which match the row name and specific
* search criteria array. The search criteria can include an array
* of qualifiers and attributes like this:
* count_qualifier_patterns(data, "row_name", [
*                        {qualifier_category:qualifier_name}
*                        , {qualifier_category:qualifier_name,
*                                attributes: {attr_cat:attr_name}}
*                    ])
*
****************************************************************/
function count_qualifier_patterns(data, clip_row_name = "", search_criteria = [], time_start = 0, time_end = Infinity) {
    // Initialize the pattern count to 0.
    let pattern_count = 0;

    // Iterate through each row in the data set.
    for (row of data.rows) {
        // If a specific row name is provided and doesn't match the current row, skip this row.
        if (clip_row_name !== "" && row.row_name !== clip_row_name) continue;
        // If there are no clips in the row, skip this row.
        if (!row.clips) continue;

        // Iterate through each clip in the row.
        for (clip of row.clips) {
            // If clip start time is less than the specified start time or end time is greater than the specified end time, skip to the next clip
            if (clip.time_start < time_start || clip.time_end > time_end) continue;

            // If there are no qualifiers in the clip, skip this clip.
            if (!clip.qualifiers) continue;

            // Initialize the search index to 0.
            let searchIndex = 0;

            // Iterate through each qualifier in the clip's qualifiers array.
            for (let i = 0; i < clip.qualifiers.qualifiers_array.length; i++) {
                const qualifier = clip.qualifiers.qualifiers_array[i];
                const search_qualifier = search_criteria[searchIndex];
                const search_qual_cat = Object.keys(search_qualifier)[0];
                const search_qual_val = search_qualifier[search_qual_cat];

                // Check if the qualifier category and name match the search criteria.
                if (qualifier.category === search_qual_cat && qualifier.name === search_qual_val) {
                    let attributesMatch = true;

                    // If there are attributes in the search criteria, check if they match the current qualifier.
                    if (search_qualifier.attributes) {
                        // Iterate through each attribute category in the search criteria.
                        for (const search_attr_cat in search_qualifier.attributes) {
                            // If the current qualifier doesn't have any attributes, set attributesMatch to false and break.
                            if (!qualifier.qualifier_attributes) {
                                attributesMatch = false;
                                break;
                            }

                            // Search for the attribute in the current qualifier's attributes.
                            let attributeFound = false;
                            for (const attribute of qualifier.qualifier_attributes) {
                                // If the attribute is found, set attributeFound to true and break.
                                if (attribute.category === search_attr_cat && attribute.name === search_qualifier.attributes[search_attr_cat]) {
                                    attributeFound = true;
                                    break;
                                }
                            }

                            // If the attribute was not found, set attributesMatch to false and break.
                            if (!attributeFound) {
                                attributesMatch = false;
                                break;
                            }
                        }
                    }

                    // If all attributes match, increment the search index.
                    if (attributesMatch) {
                        searchIndex++;
                        // If the search index reaches the length of the search criteria, increment the pattern count.
                        if (searchIndex === search_criteria.length) {
                            pattern_count++;
                            console.log("Clip UUID:", clip.uuid, "| Pattern occurrence:", pattern_count);
                            searchIndex = 0;
                            i -= (search_criteria.length - 1);
                        }
                    } else {
                        searchIndex = 0;
                    }
                } else {
                    searchIndex = 0;
                }
            }
        }
    }
    // Return the final pattern count.
    return pattern_count;
};

/****************************************************************
* COUNT ATTRIBUTES
* ---------------------------------------------------------------
* Function to return the number of attributes which appear in
* clips which match the specific search criteria
*
****************************************************************/
function count_attributes(data, row_name = "", search_criteria = [], time_start = 0, time_end = Infinity) {
    let attributeCount = 0;

    // Iterate through each row in the dataset.
    for (const row of data.rows) {
        // Check for row name and time constraints.
        if ((row_name !== "" && row.row_name !== row_name) || !row.clips) continue;

        // Iterate through each clip in the row.
        for (const clip of row.clips) {
            // Check if clip falls within the specified time range.
            if (clip.time_start < time_start || clip.time_end > time_end || !clip.qualifiers || !clip.qualifiers.qualifiers_array) continue;

            let searchIndex = 0;

            // Iterate through each qualifier in the clip.
            for (let i = 0; i < clip.qualifiers.qualifiers_array.length; i++) {
                const qualifier = clip.qualifiers.qualifiers_array[i];
                const search_qualifier = search_criteria[searchIndex];

                // Optional: Check if qualifier category and name are part of the search criteria.
                const search_qual_cat = search_qualifier.category || '';
                const search_qual_val = search_qualifier.name || '';

                // Determine if there's a match on category and name.
                const categoryMatch = search_qual_cat === '' || qualifier.category === search_qual_cat;
                const nameMatch = search_qual_val === '' || qualifier.name === search_qual_val;

                // If the category and name match and there are attributes in the qualifier.
                if (categoryMatch && nameMatch && qualifier.qualifier_attributes) {
                    let attributesMatch = true;

                    // Check if attributes match the search criteria.
                    if (search_qualifier.attributes) {
                        for (const search_attr_cat in search_qualifier.attributes) {
                            const search_attr_val = search_qualifier.attributes[search_attr_cat] || '';
                            let attributeFound = false;

                            // Iterate through each attribute in the qualifier.
                            for (const attribute of qualifier.qualifier_attributes) {
                                const attributeCatMatch = search_attr_cat === '' || attribute.category === search_attr_cat;
                                const attributeNameMatch = search_attr_val === '' || attribute.name === search_attr_val;

                                // If attribute matches the search criteria.
                                if (attributeCatMatch && attributeNameMatch) {
                                    attributeFound = true;
                                    break;
                                }
                            }

                            // If the required attribute is not found, break the loop.
                            if (!attributeFound) {
                                attributesMatch = false;
                                break;
                            }
                        }
                    }

                    // If all attributes match, update search index and count.
                    if (attributesMatch) {
                        searchIndex++;
                        if (searchIndex === search_criteria.length) {
                            attributeCount++;
                            console.log("Clip UUID:", clip.uuid, "| Pattern occurrence:", attributeCount);
                            // Reset search index for next search.
                            searchIndex = 0;
                            i -= (search_criteria.length - 1);
                        }
                    } else {
                        // Reset search index if attributes do not match.
                        searchIndex = 0;
                    }
                } else {
                    // Reset search index if category and name do not match.
                    searchIndex = 0;
                }
            }
        }
    }
    // Return the final count of attributes that match the criteria.
    return attributeCount;
}


/****************************************************************
* SUM CLIP DURATIONS
* ---------------------------------------------------------------
* Function to return the cumulative sum of clip durations which
* match the row name and specific search criteria array. The
* search criteria can include an array of qualifiers and
* attributes like this:
* count_clips(data, "row_name", [
*                        {qualifier_category:qualifier_name}
*                        , {qualifier_category:qualifier_name,
*                                attributes: {attr_cat:attr_name}}
*                    ])
*
****************************************************************/
function sum_clip_durations(data, clip_row_name = "", search_criteria = [], time_start = 0, time_end = Infinity) {
    // Initialize the total_duration to 0
    let total_duration = 0;

    // Loop through each row in the data
    for (row of data.rows) {
        // If the row_name does not match the clip_row_name, skip to the next row
        if (clip_row_name !== "" && row.row_name !== clip_row_name) continue;

        // If the row does not have any clips, skip to the next row
        if (!row.clips) continue;

        // Loop through each clip in the row
        for (clip of row.clips) {
            // If clip start time is less than the specified start time or end time is greater than the specified end time, skip to the next clip
            if (clip.time_start < time_start || clip.time_end > time_end) continue;

            // If search_criteria is not empty, filter clips based on search criteria
            if (search_criteria.length > 0) {
                if (!clip.qualifiers || !clip.qualifiers.qualifiers_array) continue;

                let matched_criteria_count = 0;
                for (const criteria of search_criteria) {
                    const category = Object.keys(criteria)[0];
                    const value = criteria[category];
                    const attributes = criteria.attributes || {};

                    for (const qualifier of clip.qualifiers.qualifiers_array) {
                        if (qualifier.category === category && qualifier.name === value) {
                            if (Object.keys(attributes).length > 0) {
                                if (!qualifier.qualifier_attributes) continue;

                                let attribute_match_count = 0;
                                for (const attribute of qualifier.qualifier_attributes) {
                                    for (const [attr_category, attr_value] of Object.entries(attributes)) {
                                        if (attribute.category === attr_category && attribute.name === attr_value) {
                                            attribute_match_count++;
                                        }
                                    }
                                }

                                if (attribute_match_count === Object.keys(attributes).length) {
                                    matched_criteria_count++;
                                    break;
                                }
                            } else {
                                matched_criteria_count++;
                                break;
                            }
                        }
                    }
                }

                if (matched_criteria_count < search_criteria.length) continue;
            }

            // Calculate the clip duration
            let clip_duration = clip.time_end - clip.time_start;
            // Round the clip_duration to two decimal places
            clip_duration = Math.round(clip_duration * 100) / 100;

            // Log the clip UUID, clip duration, and cumulative duration
            console.log("Clip UUID:", clip.uuid, "| Clip Duration:", clip_duration, "s | Cumulative Duration:", (total_duration + clip_duration), "s");

            // Add the clip duration to the total duration
            total_duration += clip_duration;
        }
    }

    // Convert search_criteria to a readable string
    let search_criteria_str = search_criteria.map(criteria => {
        let category = Object.keys(criteria)[0];
        let value = criteria[category];
        let attributes = criteria.attributes || {};

        let attribute_str = Object.entries(attributes).map(([attr_category, attr_value]) => {
            return `${attr_category}: ${attr_value}`;
        }).join(', ');

        return `${category}: ${value}` + (attribute_str ? ` (${attribute_str})` : '');
    }).join(', ');

    // Log the row_name, total_duration, and search_criteria_str to the console
    console.log(clip_row_name + ": " + total_duration + "s | Search Criteria: " + search_criteria_str);

    return total_duration;
};

/****************************************************************
* ALL ROW DURATIONS
* ---------------------------------------------------------------
* Function to return an object of row_names and their total clip
* durations from the timeline
****************************************************************/
function all_row_durations(data, rows) {
    let obj = {};
    for (row of rows) {
        if (typeof row === 'undefined') {
            var row_name = "NONE";
        } else { var row_name = row;}
        obj[row_name] = sum_duration_clips(data, row_name); 
    };
    return obj;
};

/****************************************************************
* COUNT CLIPS TABLE ---------------------------------------------
* Function to return an object to be used in 'create_data_table'
* function with each key being a column header name and the
* values being a count of clips. An array of clip row names
* should be passed to 'rows' and an array of qualifier names
* should be passed to 'columns' for this to work correctly
****************************************************************/
function count_clips_table(data, rows, columns, time_start = 0, time_end = Infinity) {
    var clips = [];
    var qualifiers = [];

    if (rows[0] === "all_rows") {
        clips = row_names(data);  
    } else { clips = rows; }
    if (columns[0] === "all_qualifiers") {
        qualifiers = qualifier_names(data)
    } else { qualifiers = columns;}

    // Create data table
    data_table = {};
    // Set 'Players' property to players array
    data_table.Clips = clips;
    // Loop over actions array and count clips for each player
    for (let qualifier of qualifiers) {
        let clip_qualifier_count = 0;
        data_table[qualifier] = [];
        for (let row of clips) {
            clip_qualifier_count = count_clips(data, row, [{"":qualifier}], time_start, time_end)
            data_table[qualifier].push(clip_qualifier_count)
        }
    }
    return data_table;
};

/****************************************************************
* READ CONFIG VARIABLES -----------------------------------------
* Function to process the config json file for a html page. This
* returns a results object to be used in 'create_config_content'
****************************************************************/
function read_config_variables(config, data) {
    var var_res = {}
    for (each in config.variables) {
        var func = config.variables[each][0];
        var row_name = config.variables[each][1];
        var rows = config.variables[each][1];
        var search_criteria = config.variables[each][2] ? config.variables[each][2] : [];
        var cols = config.variables[each][2] ? config.variables[each][2] : [];
        var time_start_read = config.variables[each][3] ? config.variables[each][3]: 0;
        time_start = eval(time_start_read);
        var time_end_read = config.variables[each][4] ? config.variables[each][4] : Infinity;
        time_end = eval(time_end_read)
        switch (func) {
            case "count_clips":
                var res = count_clips(data, row_name, search_criteria, time_start, time_end)
                eval(`var ${each} = ${res};`);
                var_res[each] = res;
                break;
            case "count_qualifiers":
                var res = count_qualifiers(data, row_name, search_criteria, time_start, time_end)
                eval(`var ${each} = ${res};`);
                var_res[each] = res;
                break;
            case "count_qualifier_patterns":
                var res = count_qualifier_patterns(data, row_name, search_criteria, time_start, time_end)
                eval(`var ${each} = ${res};`);
                var_res[each] = res;
                break;
            case "count_attributes":
                var res = count_attributes(data, row_name, search_criteria, time_start, time_end)
                eval(`var ${each} = ${res};`);
                var_res[each] = res;
                break;    
                case "sum_clip_durations":
                var res = sum_clip_durations(data, row_name, search_criteria, time_start, time_end)
                eval(`var ${each} = ${res};`);
                var_res[each] = res;
                break;
            case "count_clips_table":
                var res = count_clips_table(data, rows, cols, time_start, time_end)
                var_res[each] = res;
                break;
            case "min_time_start":
                var res = clip_extract(data, row_name, "time_start")
                res.sort(function(a, b) {
                    return a - b;
                  });
                eval(`var ${each} = ${res[0]};`);
                var_res[each] = res[0];
                break;
            case "max_time_end":
                var res = clip_extract(data, row_name, "time_end")
                var max = res.length;
                res.sort(function(a, b) {
                    return a - b;
                  });
                eval(`var ${each} = ${res[max]};`);
                var_res[each] = res[max];
                break;
        }
    }

    return var_res;
};


/****************************************************************
 * --------------------------------------------------------------
 * VIZ FUNCTIONS -----------------------------------------------
 * --------------------------------------------------------------
****************************************************************/

/****************************************************************
* CREATE DATA TABLE
* ---------------------------------------------------------------
* Function to create a table from an object called "data_table"
****************************************************************/
function create_data_table(id, title, data_table, location_id, colour) {
    // Add title to the location div
    d3.select(location_id)
        .attr("style", "overflow-x: auto;")
        .append("h5")
        .text(title)

    // Create an table in the body element
    let table = d3.select(location_id)
        .append("table")
        .attr("class", "table table-striped table-hover")
        .attr("style", "text-align: center")
        .attr("id", id)

    // Add a table header row
    let header_row = table.append("thead")
                        .attr("style", "background-color: " + colour + ";color: #fff")
                        .append("tr")

    // Define headers and add them from the data table
    let header_data = Object.keys(data_table)
    const table_length = data_table[header_data[0]].length

    header_row.selectAll("th")
        .data(header_data)
        .enter()
        .append("th")
        .attr("scope", "col")
        .attr("onclick", function (d, i) {return "sortTable('"+id+"', "+i+")";})
        .text(function (d) {return d;});

    // Add a table body
    let t_body = table.append("tbody")

    // Add data to table
    for (let i=0; i < table_length; i++) {
        let row = t_body.append("tr")
        for (td of header_data) {row
                                    .append("td")
                                    .text(data_table[td][i])}
    };
};

/****************************************************************
* CREATE DATA CARD
* ---------------------------------------------------------------
* Function to create a data card with a single data value
****************************************************************/
function create_data_card(id, title, data, location_id, colour = "#532CEB", textcolour = "white", height= "100") {
    // Create a card element
    d3.select(location_id)
        .append("div")
        .attr("class", "card m-1")
        .attr("style", "background-color:" + colour + "; color:" + textcolour +"; height:" + height + "px")
        .attr("id", id)
        .append("div")
        .attr("class", "card-body d-flex flex-column justify-content-center align-items-center")
        .append("h5")
        .attr("class", "card-title text-center")
        .attr("style", "font-size:" + height/6 + "px;")
        .text(title)
        .append("p")
        .attr("class", "card-text")
        .attr("style", "font-size:" + height/4 + "px;")
        .text(data)
};

/****************************************************************
* SUCCESS DONUT
* ---------------------------------------------------------------
* Function to create a donut chart with 2 values - success/fail
****************************************************************/
function create_success_donut(id, title, success_val, failure_val, location_id, size, colour = "#532CEB"){

    let perc = percentage(success_val,(success_val + failure_val));
    let width = size;
    let height = size;

    // Declare generic donut chart parameters
    var radius = Math.min(width, height) / 2;
        color = d3.scaleOrdinal([colour,'grey']);
        pie = d3.pie().sort(null);
        arc = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius - radius*0.3);

    // Select the div container
    var container = d3.select(location_id)
        .append("div")
        .attr("id", id)
        .attr("class","donut-container");

    // Create wrapper element with same width as SVG
    var wrapper = container.append("div")
        .style("width", width + "px")
        .style("margin", "0 auto");

    // Append title to wrapper
    wrapper.append("h5")
        .text(title)
        .style("text-align", "center");

    // Create svg for donut inside the wrapper
    var svg = wrapper.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "fluid");

    // create group for defensive donut in the svg
    var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // create arcs for defensive donut
    var arcs = g.selectAll(".arc")
                .data(pie([success_val, failure_val]))
                .enter()
                .append("g")
                .attr("class", "arc");

    // append path and colours for background grey circle
    arcs.append("path")
        .attr("fill", "#efefef")
        .attr("d", arc)
    // append path and colours for donut
    arcs.append("path")
    .transition()
    .duration(1500)
    .attr("d", arc)
    .attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
        return function(t) {
            d.endAngle = i(t); 
            return arc(d)
        }
    })
    .attr("fill", function(d,i){ return color(i)})
    .attr("fill-opacity", function(d,i){ if (i>0){return 0} else{return 1}});

    // Labels for Donut    
    arcs.append("text")
        .style("text-anchor", "middle") // center horizontally
        .style("dominant-baseline", "middle") // center vertically
        .attr("font-size", radius*0.33)
        .text(perc + "%");
};

/****************************************************************
* CONTEST BAR
* ---------------------------------------------------------------
* Function to create a horizontal elliptical bar with 2 values -
* success/fail
****************************************************************/
function create_contest_bar(id, title, success_val, failure_val, location_id, width, height, colour = "#532CEB") {

    // Create array of data values
    let data_values = [success_val, failure_val]
    let meet_point = percentage(success_val,(success_val+failure_val))/100
    let bar_corner_radius = width/15

    // Create an svg in the body element
    let graph = d3.select(location_id)
            .append("div")
            .attr("id", id)
            .attr("class","d-flex py-1 justify-content-center")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "fluid");
    
    // Create a 'g' group for each data key
    let bar = graph.append("g")
            .attr("transform", function(d, i) {
                    return "translate(0," + i * height + ")";
            }); 

    // Draw background bar
    let back_bar = bar.append("rect")
            .attr("height", height)
            .attr("width", width)
            .attr("fill", "#efefef")
            .attr("rx", bar_corner_radius)
            .attr("ry", bar_corner_radius);

    // Draw the contest bars over the grey bar width 0 ready to animate
    let rect = bar.selectAll("rect.bars")
            .data(data_values)
            .enter()
            .append("rect")
            .attr("id", function(d) {return d;})
            .attr("x", function(d, i) { if (i==0) { return 0;} else { return width;}})
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", height)
            .attr("fill", function(d, i) { if (i==0) { return colour} else {return "#efefef00"}})
            .attr("fill-opacity", 0)
            .attr("rx", bar_corner_radius)
            .attr("ry", bar_corner_radius)

    // Transition of rectangles to 'grow' in from LHS one after the other
    rect.transition()
        .ease(d3.easeLinear)
        .duration(1500)
        .attr("x", function(d, i) { if (i==0) { return 0;} else { return meet_point*width;}})
        .attr("width", function(d, i) { if (i==0) { return meet_point*width;} else { return width-meet_point*width;}})
        .attr("fill-opacity", 1)

    // Add data label text onto the end each bar group
    let bar_text = bar.selectAll("text")
            .data(data_values)
            .enter()
            .append("text")
            .attr("x", function(d, i) {      
                if (i === 1) {
                    return "85%";
                } else {return "15%";}
            })
            .attr("y", "50%")
            .attr("text-anchor", function(d, i) { if (i==1) { return "start";} else { return "end";}})
            .attr("dominant-baseline", "middle")
            .attr("font-size", height*0.4)
            .attr("fill", "#ffffff")
            .text(function(d, i) { return data_values[i];})
            .style("opacity", 0); // starts invisible

    bar.append("text")
            .text(title)
            .attr("font-size", height*0.4)
            .attr("fill", "#ffffff")
            .attr("x", "50%")
            .attr("y", "50%")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")

    //Transition of text from invisible to visible one after the other
    bar_text.transition()
        .duration(1500)
        .style("opacity", 1)

        //Transition of text from invisible to visible one after the other
    back_bar.transition()
        .duration(1500)
        .attr("fill", "#bfbfbf")

};

/****************************************************************
* SCATTER PLOT
* ---------------------------------------------------------------
* Function to create a scatter plot of two respective team's data
****************************************************************/
function create_scatter_plot(id, team1_data, team2_data, background_image_path = "images/map_football_horiz.png", location_id, width, height, colour1 = "yellow", colour2 = "red") {

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 60, left: 60},
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;

    // Tooltip setup
    var tooltip = d3.select(location_id)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("position", "absolute")
        .style("width", width*0.25 + "px");

    // Mouse interaction functions
    var mouseover = function(d) {
        tooltip.style("opacity", 1)
    }

    var mousemove_team1 = function(d) {
        var [x, y] = d3.pointer(event)
        tooltip
        .html("<b>Team 1</b><br>" +
                "time: " + ((d.target.__data__[2] / 60).toFixed(0)) + " mins" + "<br>" +
                "x: " + (d.target.__data__[0].toFixed(2)) + "<br>" +
                "y: " + (d.target.__data__[1].toFixed(2)))
        .style("left", (event.offsetX + 10) + "px") 
        .style("top", (event.offsetY + 10)  + "px")
    }
    
    var mousemove_team2 = function(d) {
        var [x, y] = d3.pointer(event)
        tooltip
        .html("<b>Team 2</b><br>" +
                "time: " + ((d.target.__data__[2] / 60).toFixed(0)) + " mins" + "<br>" +
                "x: " + (d.target.__data__[0].toFixed(2)) + "<br>" +
                "y: " + (d.target.__data__[1].toFixed(2)))
        .style("left", (event.offsetX + 10) + "px") 
        .style("top", (event.offsetY + 10)  + "px")
    }

    var mouseleave = function(d) {
        tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }

    // Append svg to specified location
    var svg = d3.select(location_id)
    .append("svg")
        .attr("id", id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Append image to svg
    svg.append("image")
        .attr("href", background_image_path)
        .attr("height", height)
        .attr("width", width)
        .attr("preserveAspectRatio", "none");

    // Add dots for Team 1
    svg.append('g')
        .selectAll("dot")
        .data(team1_data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return d[0] * width; } )
            .attr("cy", function (d) { return (1 - d[1]) * height; } )
            .attr("r", 5)
            .style("fill", colour1)
        .on("mouseover", mouseover )
        .on("mousemove", mousemove_team1 )
        .on("mouseleave", mouseleave );

    // Add dots for Team 2
    svg.append('g')
        .selectAll("dot")
        .data(team2_data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return d[0] * width; } )
            .attr("cy", function (d) { return (1 - d[1]) * height; } )
            .attr("r", 5)
            .style("fill", colour2)
        .on("mouseover", mouseover )
        .on("mousemove", mousemove_team2 )
        .on("mouseleave", mouseleave );

}

/****************************************************************
* CREATE BOOTSTRAP GRID
* ---------------------------------------------------------------
* Function to create a booptstrap grid with id's A1, A2, B1...etc
****************************************************************/
function create_bootstrap_grid(rows, columns) {
    // Create a layout object with the given rows and columns
    const layout = { "rows": rows, "columns": columns };

    // Select the body of the HTML document using D3.js
    const body = d3.select("body");

    // Append a new div element with the "container" class to the body
    const container = body.append("div")
        .attr("class", "container-fluid");

    // Iterate through the specified number of rows
    for (let i = 0; i < layout.rows; i++) {
        // Append a new div element with the "row my-2" classes for each row
        const row = container.append("div")
            .attr("class", "row my-2");

        // Determine the number of columns for the current row
        const columnsPerRow = Array.isArray(layout.columns) ? layout.columns[i] : layout.columns;

        // Iterate through the columns for the current row
        for (let j = 0; j < columnsPerRow; j++) {
            // Calculate the Bootstrap column size by dividing 12 by the columnsPerRow value
            const columnSize = Math.floor(12 / columnsPerRow);

            // Generate a unique ID for each column, e.g. A1, A2, B1, etc.
            const columnId = String.fromCharCode(65 + j) + (i + 1);

            // Append a new div element to the current row with the calculated column size and the unique ID
            const cell = row.append("div")
                .attr("class", `col-md-${columnSize} py-2`)
                .attr("id", columnId);
        }
    }
};

/****************************************************************
* CREATE UPDATE BUTTON
* ---------------------------------------------------------------
* Function to create a switch button to regenerate vizualisations
****************************************************************/
function create_update_button(button_text, button_id, location_id, update_div_function) {
    // Select the HTML element with the specified selector
    var element = d3.select(location_id);
      
    // Create a button
    element.append('button')
            .attr("id", button_id)
            .attr("class", "btn btn-dark m-1")
            .attr("onclick", update_div_function + "()")
            .text(button_text);
};

/****************************************************************
* CREATE BUTTON LINK
* ---------------------------------------------------------------
* Function to create a switch button to regenerate vizualisations
****************************************************************/
function create_button_link(id, button_text, location_id, link_path) {
    // Select the HTML element with the specified selector
    var element = d3.select(location_id);
      
    // Create a button
    element.append('a')
            .attr("id", id)
            .attr("class", "btn btn-dark m-1")
            .attr("href",  link_path)
            .text(button_text);
};

/****************************************************************
* CREATE TEXT
* ---------------------------------------------------------------
* Function to create some text for the page
****************************************************************/
function create_text(id, text, location_id, size, textcolour, align) {
    // Select the HTML element with the specified selector
    var element = d3.select(location_id);

    // Create text
    element.append('p')
            .attr("id", id)
            .attr("style", "font-size:"+size+"px; color:"+textcolour+"; text-align:"+align+";")
            .text(text);
};

/****************************************************************
* CREATE IMAGE
* ---------------------------------------------------------------
* Function to create some text for the page
****************************************************************/
function create_image(id, image_location, location_id, width) {
    // Select the HTML element with the specified selector
    var element = d3.select(location_id);

    // Create image
    element.append('img')
            .attr("id", id)
            .attr("src", image_location)
            .attr("class", "img-fluid")
            .attr("style", "padding: 10px; width:"+width+"px; margin: 0 auto; display: block;");
};

/****************************************************************
* CREATE CONFIG CONTENT ------------------------------------------
* Function to process the config json file for a html page. This
* returns the html elements as requested by the config file
****************************************************************/
function create_config_content(config, var_results) {
    // Evaluate each variable into memory so they can be used by their names
    for (const key in var_results) {
        if (var_results.hasOwnProperty(key)) {
            eval(`var ${key} = var_results[key];`);
        }
    }

    for (el in config.content) {
        switch (config.content[el][0]) {
                case "create_data_card":
                    var id = el;
                    var title = config.content[el][1];
                    var variable = eval(config.content[el][2]);
                    var value = typeof variable === "number" ? variable : var_results[variable];
                    var location_id = config.content[el][3];
                    var custom_colour = config.content[el][4] ? config.content[el][4] : "#532CEB";
                    var colour = config.colours[custom_colour] ? config.colours[custom_colour] : custom_colour;
                    var custom_textcolour = config.content[el][5] ? config.content[el][5] : "white";
                    var textcolour = config.colours[custom_textcolour] ? config.colours[custom_textcolour] : custom_textcolour;
                    create_data_card(id, title, value, location_id, colour, textcolour);
                    break;
                case "create_success_donut":
                    var id = el;
                    var title = config.content[el][1];
                    var var1 = eval(config.content[el][2]);
                    var success_val = typeof var1 === "number" ? var1 : var_results[var1];
                    var var2 = eval(config.content[el][3]);
                    var failure_val = typeof var2 === "number" ? var2 : var_results[var2];
                    var location_id = config.content[el][4];
                    var size = config.content[el][5] ? config.content[el][5] : 100;
                    var custom_colour = config.content[el][6] ? config.content[el][6] : "#532CEB"
                    var colour = config.colours[custom_colour] ? config.colours[custom_colour] : custom_colour;
                    create_success_donut(id, title, success_val, failure_val, location_id, size, colour);
                    break;
                case "create_contest_bar":
                    var id = el;
                    var title = config.content[el][1];
                    var var1 = eval(config.content[el][2]);
                    var success_val = typeof var1 === "number" ? var1 : var_results[var1];
                    var var2 = eval(config.content[el][3]);
                    var failure_val = typeof var2 === "number" ? var2 : var_results[var2];
                    var location_id = config.content[el][4];
                    var width = config.content[el][5] ? config.content[el][5] : 200;
                    var height = config.content[el][6] ? config.content[el][6] : 40;
                    var custom_colour = config.content[el][7] ? config.content[el][7] : "#532CEB"
                    var colour = config.colours[custom_colour] ? config.colours[custom_colour] : custom_colour;
                    create_contest_bar(id, title, success_val, failure_val, location_id, width, height, colour);
                    break;
                case "create_text":
                    var id = el;
                    var text = config.content[el][1];
                    var location_id = config.content[el][2];
                    var size = config.content[el][3] ? config.content[el][3] : 10;
                    var custom_colour = config.content[el][4] ? config.content[el][4] : "#532CEB"
                    var colour = config.colours[custom_colour] ? config.colours[custom_colour] : custom_colour;
                    var align = config.content[el][5] ? config.content[el][5] : "left";
                    create_text(id, text, location_id, size, colour, align);
                    break;
                case "create_image":
                    var id = el;
                    var image_location = config.content[el][1];
                    var location_id = config.content[el][2];
                    var width = config.content[el][3] ? config.content[el][3] : "100%";
                    create_image(id, image_location, location_id, width);
                    break;
                case "create_table":
                    var id = el;
                    var title = config.content[el][1];
                    var var1 = config.content[el][2]
                    var table_data = var_results[var1];
                    var location_id = config.content[el][3];
                    var custom_colour = config.content[el][4] ? config.content[el][4] : "#532CEB"
                    var colour = config.colours[custom_colour] ? config.colours[custom_colour] : custom_colour;
                    create_data_table(id, title, table_data, location_id, colour);
                    break;
                case "create_button_link":
                    var id = el;
                    var text = config.content[el][1];
                    var location_id = config.content[el][2];
                    var link_path = config.content[el][3];
                    create_button_link("id", text, location_id, link_path);
                    break;
                default:
                    console.log("Unable to add content: "+el);
                    break;
            }
    }
};


/****************************************************************
 * --------------------------------------------------------------
 * MISC FUNCTIONS -----------------------------------------------
 * --------------------------------------------------------------
****************************************************************/

/****************************************************************
* UNIQUE ARRAY --------------------------------------------------
* Function to return an array of unique values from a long array
****************************************************************/
function uniqueArray(long_array) {
    return [...new Set(long_array)];
};

/****************************************************************
* PERCENTAGE
* ---------------------------------------------------------------
* Function to return a nice number to use for a percentage.
****************************************************************/
function percentage (numerator, denominator) {
    var percent = Math.floor((numerator / denominator) * 100);
    var valueIsNan = (percent !== percent);
    if (valueIsNan == true) {
        return 0
    } else {
        return percent
    }
};

/****************************************************************
* SEND TO CLIPBOARD
* ---------------------------------------------------------------
* Function to send text to the computer clipboard and also turns
* the display function of any DOM element with the id = 
* "clipboard_alert"
****************************************************************/
function send_to_clipboard(text) {
    navigator.clipboard.writeText(text);
    //document.getElementById("clipboard_alert").style.display = "block";
};

/****************************************************************
* SORT TABLE
* ---------------------------------------------------------------
* Function to sort a HTML table using it's id, column number 'n'
* and if specified the initial direction for the sort order.
****************************************************************/
function sortTable(tableid, n, initialDir = "desc") {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(tableid);
    switching = true;
    // Set the sorting direction to the provided initialDir or default to "desc":
    dir = initialDir;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        tab_rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (tab_rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = tab_rows[i].getElementsByTagName("TD")[n];
            y = tab_rows[i + 1].getElementsByTagName("TD")[n];
            if (Number.isNaN(Number(x.innerHTML))) {
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            // Otherwise we sort numerically as the number test was positive
            else {
                if (dir == "asc") {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;  
                    }
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            tab_rows[i].parentNode.insertBefore(tab_rows[i + 1], tab_rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /* If no switching has been done AND the direction is "desc",
            set the direction to "asc" and run the while loop again. */
            if (switchcount == 0 && dir == "desc") {
                dir = "asc";
                switching = true;
            } else if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

/****************************************************************
* TRANSPOSE MATRIX
* ---------------------------------------------------------------
* Function to transpose a 2d array
*
****************************************************************/
function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
};

/****************************************************************
* TIME NOW
* ---------------------------------------------------------------
* Function to return the current local time
*
****************************************************************/
function time_now() {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let time_now = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    return time_now;
};

/****************************************************************
* MAKE HTML ID READY
* ---------------------------------------------------------------
* Function to take a string and make it ready to be used as an 
* HTML id by removing all spaces and prefixing anything which
* starts with a number with "n_"
*
****************************************************************/
function make_html_id_ready(input) {
    if (input.includes(" ")) {
        input = input.replaceAll(" ", "");
    };
    if (input.match(new RegExp(/^\d/)) !== null) {
        input = "n_" + input;
    }
    return input;
};

/****************************************************************
* CONVERT DEGRESS TO RADIANS
* ---------------------------------------------------------------
* Function to convert radians to degrees
*
****************************************************************/
function radians(degrees) {
    return 2*Math.PI*degrees/360
};  

/****************************************************************
/****************************************************************
/****************************************************************
 * The following functions are not yet supported
/****************************************************************
/****************************************************************
/****************************************************************

/****************************************************************
* CALCULATE TOTAL XG
* ---------------------------------------------------------------
* Function to calculate TOTAL xG for a given row in Angles with a chance
* qualifier and an xg qualifier. Lastly use a xg_matrix model to
* multiply the chances by in each zone. Example shown below
*
* example callback: calculate_xg(json_data,
*                                "Home Shot",
*                                "Chance Quality",
*                                ["Big Chance", "Normal Chance", "Difficult Chance"],
*                                "xG Rating",
*                                ["xG1", "xG2", "xG3", "xG4"],
*                                [[0.75, 0.66, 0.30, 0.10]
*                                ,[0.66, 0.30, 0.10, 0.02]
*                                ,[0.30, 0.10, 0.05, 0.01]])
****************************************************************/
function calculate_total_xg(data, team_row_name, chance_category, chance_names, xg_category, xg_names, xg_matrix) {
    // Clear i loop-counter and the data_matrix array and set thexg_sum total to 0
    let data_matrix = [];
    let xg_sum = 0;
    let i=0;
    // Loop through each chance type of the chance_types array
    for (chance_row of chance_names) {
        // Clear j loop-counter and the data_row array
        let j=0
        data_row = []
        // Loop through each rating of the xg_ratings array 
        for (xg_col of xg_names) {
            // Clear j loop-counter and reset the data_count to 0
            let data_count = 0
            // Find the number of clips for the respective qualifiers
            data_count = count_clips_w_multi_qualifiers( data
                                                        , team_row_name
                                                        , {[xg_category]: xg_names[j]
                                                            , [chance_category]: chance_names[i]})
            // Append the value to the end of the data row zo it can then be
            // multiplied by the respective xg_matrix score value
            data_row.push(data_count)
            xg_sum += data_count * xg_matrix[i][j]
            // increment j by 1
            j++
        }
        // Append the data row to the data matrix for future use
        data_matrix.push(data_row)
        // increment i by 1
        i++
    }
    return xg_sum;
}

/****************************************************************
* CALCULATE SINGLE XG EVENT
* ---------------------------------------------------------------
* Function to calculate xG for a given event/clip in Angles with a
* chance qualifier and an xg qualifier. Lastly use a xg_matrix model
* to multiply the chances by in each zone. Example shown below
*
* example callback: calculate_xg("Big Chance",
*                                "xG1",
*                                ["Big Chance", "Normal Chance", "Difficult Chance"],
*                                ["xG1", "xG2", "xG3", "xG4"],
*                                [[0.75, 0.66, 0.30, 0.10]
*                                ,[0.66, 0.30, 0.10, 0.02]
*                                ,[0.30, 0.10, 0.05, 0.01]])
****************************************************************/
function calculate_xg(chance_name, xg_name,  chance_names, xg_names, xg_matrix) {
    let xg_value = 0;
    let chance_row = chance_names.indexOf(chance_name);
    let xg_col = xg_names.indexOf(xg_name);
    xg_value = xg_matrix[chance_row][xg_col];
    return xg_value;
}

/****************************************************************
* EXTRACT CLIP DATA
* ---------------------------------------------------------------
* Function to return an array with clips and their start time from
*  a data set which have multiple qualifer names and categories.
* You MUST define category if there is one defined in the data else
* undefined is ok
*
* example callback:
*
****************************************************************/
function extract_clip_data(data, clip_row_name, clip_category = "") {
    row_extract = []
    // Loop through each row
    for (row of data.rows) {
        // Define the row name into a var
        let row_name = row.row_name
        // Only execute for the given row name 'clip_row_name'
        if (row_name === clip_row_name && (clip_category == row.row_category || clip_category == "")) {
            // Check if any clips exists for the given row
            if ("clips" in row) {
                // Loop through each clip
                for (clip of row.clips) {
                    let clip_extract = []
                    clip_extract.push(row_name,
                                        clip.time_start, 
                                        clip.time_end,
                                        clip.color)
                    // Create blank array to hold results of searches against the data
                    var key_value_pair = []
                    // Check if any qualifiers exists for the given clip
                    if ("qualifiers" in clip) {
                        // Loop through each qualifier in the data
                        for (qualifier of clip.qualifiers.qualifiers_array) {
                                // Append qualifier detail to the clip_extract
                                clip_extract.push(qualifier.time,
                                                    qualifier.name,
                                                    qualifier.category,
                                                    qualifier.color)
                                // If cartesian data on the qualifier then append this too
                                if ("x" in qualifier) {
                                    clip_extract.push(qualifier.x, qualifier.y)
                                }
                                attrs = qualifier.qualifier_attributes
                                if (!attrs) continue;
                                for (attr of attrs) {
                                    clip_extract.push(attr.name)
                                    clip_extract.push(attr.category)
                                }
                                }
                    }
                    // 
                    row_extract.push(clip_extract)
                }
            }
        }
    }
    return row_extract
};


/****************************************************************
* CREATE XG TRACKER DATA
* ---------------------------------------------------------------
* Function to return an array of times in mins and cumulative xg
* scores to be used in a scatter plot to track game momentum based
* on a basic xG model defined in previous functions
*
****************************************************************/
function create_xg_tracker_data(team_clip_data, kickoff_time, chance_category, chance_names, xg_category, xg_names, xg_matrix) {
    let xg_tracker_data = [];
    let cumulative_xg = 0;
    for (clip of team_clip_data) {
        let clip_xg = 0;
        let chance_index = clip.indexOf(chance_category) - 1;
        let chance_name = clip[chance_index];
        let xg_index = clip.indexOf(xg_category) - 1;
        let xg_name = clip[xg_index];
        let clip_time = (clip[1] + clip[2] ) / 2
        let clip_time_game_mins = Math.round((clip_time - kickoff_time)/60);
        clip_xg = calculate_xg(chance_name, xg_name, chance_names, xg_names, xg_matrix)
        cumulative_xg += clip_xg;
        xg_tracker_data.push([clip_time_game_mins, cumulative_xg])
    }
    return xg_tracker_data
}

/****************************************************************
* CREATE XG TRACKER PLOT DATA
* ---------------------------------------------------------------
* Function to return an array similar to "create_xg_tracker_data"
* the difference being this function adds additional data points
* to ensure a square plot is produced starting at origin (0,0)
*
****************************************************************/
function create_xg_tracker_plot_data(team_clip_data, kickoff_time, chance_category, chance_names, xg_category, xg_names, xg_matrix) {
    let xg_tracker_data = [];
    let cumulative_xg = 0;
    let clip_time_game_mins = 0;
    
    // Push (0, 0) origin for graph
    xg_tracker_data.push([clip_time_game_mins, cumulative_xg])

    // extract relevant data from each clip
    for (clip of team_clip_data) {
        let clip_xg = 0;
        let chance_index = clip.indexOf(chance_category) - 1;
        let chance_name = clip[chance_index];
        let xg_index = clip.indexOf(xg_category) - 1;
        let xg_name = clip[xg_index];
        let clip_time = (clip[1] + clip[2] ) / 2
        clip_time_game_mins = Math.round((clip_time - kickoff_time)/60);
        // add a point to the data so the graph does not increase before the new xg value is added
        xg_tracker_data.push([clip_time_game_mins, cumulative_xg])
        clip_xg = calculate_xg(chance_name, xg_name, chance_names, xg_names, xg_matrix)
        cumulative_xg += clip_xg;
        xg_tracker_data.push([clip_time_game_mins, cumulative_xg])
    }
    return xg_tracker_data
}

/****************************************************************
* EXTRACT TEAM SHOT LOCATIONS
* ---------------------------------------------------------------
* Function to return an array of team shot locations
*
****************************************************************/
function extract_team_shot_locations(team_clip_data) {
    let team_shot_locations = []
    for (clip of team_clip_data) {
        let shot_location_x_index = clip.indexOf("Shot Location") + 3;
        let shot_location_y_index = clip.indexOf("Shot Location") + 4;
        let shot_start_time = clip[1];  
        let shot_location_x = clip[shot_location_x_index];
        let shot_location_y = clip[shot_location_y_index];
        team_shot_locations.push([shot_location_x, shot_location_y, shot_start_time])
    }
    return team_shot_locations;
}

/****************************************************************
* GAME CLOCK
* ---------------------------------------------------------------
* Function to return the current game time in minutes since the
* last half start
*
****************************************************************/
function game_clock(data, kickoff_row_name) {
    let kickoff_clip_data = extract_clip_data(data, kickoff_row_name);
    let kickoff_time = Math.round((kickoff_clip_data[0][1] + kickoff_clip_data[0][2]) / 2);
    let last_clip_end_times_arr = [];
    for (row of data.rows) {
        if ("clips" in row) {
            // extract relevant data from each clip
            let last_clip_index = row.clips.length - 1;
            let last_clip_end_time = row.clips[last_clip_index].time_end;
            last_clip_end_times_arr.push(last_clip_end_time);
        }
    }
    let max_clip_end_time = Math.max(...last_clip_end_times_arr);
    let game_clock_secs = max_clip_end_time - kickoff_time;
    let game_clock = Math.ceil(game_clock_secs / 60);
    return game_clock;
}


/****************************************************************
* CREATE GOT RACE DATA
* ---------------------------------------------------------------
* Function to return an array of times in mins and cumulative got
* scores to be used in a scatter plot
*
****************************************************************/
function create_got_race_data(team_clip_data, kickoff_time) {
    let got_race_data = [];
    let got_race_plot_data = [];
    let cumulative_got = 0;
    let clip_time_game_mins = 0;
    
    // Push (0, 0) origin for graph
    got_race_data.push([clip_time_game_mins, cumulative_got])

    // extract relevant data from each clip
    for (clip of team_clip_data) {
        let clip_got = 0;
        for (const [el,val] of clip.entries()) {
            if (val == "Score" || val == "score") {
                let score_index = el - 1;
                let clip_time = (clip[1] + clip[2] ) / 2
                clip_time_game_mins = Math.round((clip_time - kickoff_time)/60);
                clip_got = clip[score_index]
                got_race_data.push([clip_time_game_mins, Number(clip_got)])
            }
        }
    }
    // Sort the data by timestamp
    got_race_data.sort(function(a, b){return a[0]-b[0]})
    
    // Build array for plot chart
    for (each of got_race_data) {
        var time = each[0];
        var new_got = each[1];
        cumulative_got += new_got
        got_race_plot_data.push([time, cumulative_got])
    }
    return got_race_plot_data;
}

/****************************************************************
* CREATE GOT RACE PLOT DATA
* ---------------------------------------------------------------
* Function to return an array similar to "create_got_race_data"
* the difference being this function adds additional data points
* to ensure a square plot is produced starting at origin (0,0)
*
****************************************************************/
function create_got_race_plot_data(team_clip_data, kickoff_time) {
    let got_race_data = [];
    let got_race_plot_data = [];
    let cumulative_got = 0;
    let clip_time_game_mins = 0;
    
    // Push (0, 0) origin for graph
    got_race_data.push([clip_time_game_mins, cumulative_got])

    // extract relevant data from each clip
    for (clip of team_clip_data) {
        let clip_got = 0;
        for (const [el,val] of clip.entries()) {
            if (val == "Score" || val == "score") {
                let score_index = el - 1;
                let clip_time = (clip[1] + clip[2] ) / 2
                clip_time_game_mins = Math.round((clip_time - kickoff_time)/60);
                clip_got = clip[score_index]
                got_race_data.push([clip_time_game_mins, Number(clip_got)])
            }
        }
    }
    // Sort the data by timestamp
    got_race_data.sort(function(a, b){return a[0]-b[0]})
    
    // Build array for plot chart
    for (each of got_race_data) {
        var time = each[0];
        var new_got = each[1];
        got_race_plot_data.push([time, cumulative_got])
        cumulative_got += new_got
        got_race_plot_data.push([time, cumulative_got])
    }
    return got_race_plot_data;
};



function chart_lines() {
    var width = 500;
    var height = 500;

    //Create new div
    var div = d3.select("body")
    .append("div")

    //Create SVG element
    var svg = div.append("svg")
    .attr("id", "chart")
    .attr("width", width)
    .attr("height", height);

    //Create line element inside SVG
    svg.append("line")
    .attr("x1", 100)
    .attr("x2", 500)
    .attr("y1", 50)
    .attr("y2", 50)
    .attr("stroke", "black")
};

function chart_rects() {
    var width = 500;
    var height = 500;

    //Create new div
    var div = d3.select("body")
    .append("div")

    //Create SVG element
    var svg = div.append("svg")
    .attr("id", "chart")
    .attr("width", width)
    .attr("height", height);

    //Create line element inside SVG
    svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 50)
    .attr("height", 50)
    .attr("stroke", "black")
};

function chart_circs() {
    var width = 500;
    var height = 500;

    //Create new div
    var div = d3.select("body")
    .append("div")

    //Create SVG element
    var svg = div.append("svg")
    .attr("id", "chart")
    .attr("width", width)
    .attr("height", height);

    //Create line element inside SVG
    svg.append("circle")
    .attr("cx", 250)
    .attr("cy", 50)
    .attr("r", 50)
};

function chart_ellipse() {
    var width = 500;
    var height = 500;

    //Create new div
    var div = d3.select("body")
    .append("div")

    //Create SVG element
    var svg = div.append("svg")
    .attr("id", "chart")
    .attr("width", width)
    .attr("height", height);

    //Create group element
    var g = svg.append("g")
               .attr("transform", function(d, i) {
                        return "translate(0,0)";
               });

    //Create line element inside SVG
    g.append("ellipse")
    .attr("cx", 250)
    .attr("cy", 50)
    .attr("rx", 150)
    .attr("ry", 50)
    .attr("fill", "green")
    .attr("opacity", 0.5)

    //Create and append text element into group
    g.append("text")
    .attr("x", 150)
    .attr("y", 50)
    .attr("stroke", "steelblue")
    .attr("font-family", "sans-serif")
    .attr("font-size", "24px")
    .text("I am a pretty ellipse!");
};

/****************************************************************
* CREATE BAR HORIZONTAL
* ---------------------------------------------------------------
* Function to create and add a horizontal bar chart using an
* object (data table) which holds keys as titles and values as
* numbers. You can also specify where to append the new chart to
* using html location_id
* 
* example callback:
*      create_bar_horizontal (data_table_obj, html_id_name)
****************************************************************/
function create_bar_horizontal (data_obj, location_id) {
    // Create array of data keys
    let data_keys = Object.keys(data_obj);
    // Create array of data values
    let data_values = []
        for (key in data_obj) {data_values.push(data_obj[key])};
    // Default sizes for visualisation
    let vizwidth = 600
    let barHeight = 20
    // Calculate the height of the visualisation
    let vizheight = barHeight * data_keys.length
    // Create scalefactor to fit bars inside the svg frame
    let scaleFactor = (vizwidth - 180) / Math.max(...data_values)
    
    // Create an svg in the body element
    let graph = d3.select(location_id)
            .append("svg")
            .attr("width", vizwidth)
            .attr("height", vizheight);
    
    // Create a 'g' group for each data key
    let bar = graph.selectAll("g")
            .data(data_keys)
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
                    return "translate(0," + i * barHeight + ")";
            });
    
    // Add placeholder text for each data key
    bar.append("text")
        .attr("x", 10)
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d; });
    
    let bar_background = bar.append("rect")
        .attr("class", "bar_bg")
        .attr("x", 135)
        .attr("y", 0)
        .attr("width", vizwidth - 135)
        .attr("height", barHeight );

    // Draw rectangles into each bar group
    let rect = bar.append("rect")
            .attr("x", 140)
            .attr("y", 4)
            .attr("width", 10)
            .attr("height", barHeight - 8);

    // Add data label text onto the end each bar group
    let bar_text = bar.append("text")
            .attr("x", function(d) {      
                    return 160 + data_obj[d] * scaleFactor;
            })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function(d) { return data_obj[d]; })
            .style("opacity", 0); // starts invisible

    // Transition of rectangles to 'grow' in from LHS one after the other
    rect.transition()
        .ease(d3.easeLinear)
        .duration(200)
        .delay(function(d, i) { return i * 50;})
        .attr("x", 150)
        .attr("width", function(d) {      
                return data_obj[d] * scaleFactor;
        });

    //Transition of text from invisible to visible one after the other
    bar_text.transition()
        .duration(200)
        .delay(function(d, i) {return i * 50})
        .style("opacity", 1)
};

/****************************************************************
* CREATE ROW TABS
* ---------------------------------------------------------------
* Function to create html tabs for each row and add bar charts
* showing each row's clip count by qualifier
* 
* example callback:
*      create_row_tabs(json_data)
****************************************************************/
function create_row_tabs(data) {

    // Create array of row names
    let tab_names_array = row_names(data);
    // Add ul element to the BS5 container
    let tab_list = d3.selectAll(".container.mt-3")
        .append("ul")
        .attr("class", "nav nav-tabs");

    // Add li element to the ul for the 'home' page
    tab_list.append("li")
        .attr("class", "nav-item")
        .append("a")
        .attr("class", "nav-link active")
        .attr("data-bs-toggle", "tab")
        .attr("href", "#Home")
        .text("Home");

    // Add li elements and a tag links for each row
    let tab = tab_list.selectAll("ul")
        .data(tab_names_array)
        .enter()
        .append("li")
        .attr("class", "nav-item")
        .append("a")
        .attr("class", "nav-link")
        .attr("data-bs-toggle", "tab")
        .attr("href", function (d) {return "#" + d.replaceAll(" ", "").replaceAll("#", "-");})
        .text(function (d) {return d;});

    // Add the div to house tab content
    let tabs_div = d3.select(".container.mt-3")
        .append("div")
        .attr("class", "tab-content");

    // Add a div for each row
    tabs_div.selectAll("div")
        .data(tab_names_array)
        .enter()
        .append("div")
        .attr("id", function (d) {return d.replaceAll(" ", "").replaceAll("#", "-");})
        .attr("class", "container tab-pane fade")
        .append("h3")
        .text(function (d) {return d;});

    // Add a home div
    tabs_div.append("div")
        .attr("id", "Home")
        .attr("class", "container tab-pane active")
        .append("h3")
        .text("Home")
        .append("p")
        .text("Player total clip duration:");

    // Home page has the row durations summary bar chart
    create_bar_horizontal(row_durations(data, row_names(data)), "#Home");

    // Collect array of all unique qualifier names
    let q_names = qualifier_names(data);

    // cycle through each row/tab and count clips by qualifier
    for (tab of tab_names_array) {
        // create empty obj to hold clip counts (data table)
        let tab_totals = {};
        // cycle through each qualifier and add an element to the obj
        for (q of q_names) {
            tab_totals[q] = count_clips_w_qualifier(data, tab, q);
        };
        // if any object has a total of 0 it is removed from the object
        for (pair in tab_totals) {
            if (tab_totals[pair] === 0) {delete tab_totals[pair];};
        };
        // Using the new obj (data table) create bar charts for each
        create_bar_horizontal(tab_totals, "#" + tab.replaceAll(" ", "").replaceAll("#", "-"));
    };
};

/****************************************************************
* CREATE CUSTOM ROW TABS
* ---------------------------------------------------------------
* Function to create html tabs for each row and add bar charts
* showing each row's clip count by qualifier
* 
* example callback:
*      create_row_tabs(json_data, tab_names)
****************************************************************/
function create_custom_row_tabs(data, tab_names_array) {

    // Add ul element to the BS5 container
    let tab_list = d3.selectAll(".container.mt-3")
        .append("ul")
        .attr("class", "nav nav-tabs");

    // Add li element to the ul for the 'home' page
    tab_list.append("li")
        .attr("class", "nav-item")
        .append("a")
        .attr("class", "nav-link active")
        .attr("data-bs-toggle", "tab")
        .attr("href", "#Home")
        .text("Home");

    // Add li elements and a tag links for each row
    let tab = tab_list.selectAll("ul")
        .data(tab_names_array)
        .enter()
        .append("li")
        .attr("class", "nav-item")
        .append("a")
        .attr("class", "nav-link")
        .attr("data-bs-toggle", "tab")
        .attr("href", function (d) {return "#" + d.replaceAll(" ", "").replaceAll("#", "-");})
        .text(function (d) {return d;});

    // Add the div to house tab content
    let tabs_div = d3.select(".container.mt-3")
        .append("div")
        .attr("class", "tab-content");

    // Add a div for each row
    tabs_div.selectAll("div")
        .data(tab_names_array)
        .enter()
        .append("div")
        .attr("id", function (d) {return d.replaceAll(" ", "").replaceAll("#", "-");})
        .attr("class", "container tab-pane fade")
        .append("h3")
        .text(function (d) {return d;})
        .append("p")
        .text("Qualifier counts:");

    // Add a home div
    tabs_div.append("div")
        .attr("id", "Home")
        .attr("class", "container tab-pane active")
        .append("h3")
        .text("Home")
        .append("p")
        .text("Player total clip duration:");

    // Home page has the row durations summary bar chart
    create_bar_horizontal(row_durations(data, tab_names_array), "#Home");

    // Collect array of all unique qualifier names
    let q_names = qualifier_names(data);

    // cycle through each row/tab and count clips by qualifier
    for (tab of tab_names_array) {
        // create empty obj to hold clip counts (data table)
        let tab_totals = {};
        // cycle through each qualifier and add an element to the obj
        for (q of q_names) {
            tab_totals[q] = count_clips_w_qualifier(data, tab, q);
        };
        // if any object has a total of 0 it is removed from the object
        for (pair in tab_totals) {
            if (tab_totals[pair] === 0) {delete tab_totals[pair];};
        };
        // Using the new obj (data table) create bar charts for each
        create_bar_horizontal(tab_totals, "#" + tab.replaceAll(" ", "").replaceAll("#", "-"));
    };
};

/****************************************************************
* CREATE ROW DROPDOWN CHARTS
* ---------------------------------------------------------------
* Function to create html dropdown for each row and add bar
* charts showing each row's clip count by qualifier
* 
* example callback:
*      create_row_dropdown_charts(json_data)
****************************************************************/
function create_row_dropdown_charts(data) {

    let rows = row_names(data);

    let main_div = d3.select(".container.mt-3")

    let dropdown_div = main_div.append("div")
                            .attr("id", "dropdown")
    
    let select_button = dropdown_div.append("select")
                            .attr("id", "selectButton")

    // add the options to the button
    select_button.selectAll('myOptions')
        .data(rows)
        .enter()
            .append('option')
        .text(function (row) { return row; }) // text showed in the menu
        .attr("value", function (row) { return row; }) // corresponding value returned by the button

    d3.select("#selectButton").on("change", function(d) {
        let dropdown_value = d3.select(this)
                            .property("value");
        
        // create empty obj to hold clip counts (data table)
        let q_totals = {};
        // cycle through each qualifier and add an element to the obj
        for (q of qualifier_names(data)) {
            q_totals[q] = count_clips_w_qualifier(data, dropdown_value, q);
        };
        // if any object has a total of 0 it is removed from the object
        for (pair in q_totals) {
            if (q_totals[pair] === 0) {delete q_totals[pair];};
        };
        d3.selectAll("#bars").remove();
        d3.select(".container.mt-3").append("div").attr("id", "bars");
        create_bar_horizontal(q_totals, "#bars");
    });
};

/****************************************************************
* CREATE CUSTOM ROW DROPDOWNs
* ---------------------------------------------------------------
* Function to create html dropdown for each row and add bar
* charts showing each row's clip count by qualifier
* 
* example callback:
*      create_custom_row_dropdowns(json_data, dropdown_names)
****************************************************************/
function create_custom_row_dropdowns(data, dd_names_array) {

    let rows = dd_names_array;

    let main_div = d3.select(".container.mt-3")

    let dropdown_div = main_div.append("div")
                            .attr("id", "dropdown")
    
    let select_button = dropdown_div.append("select")
                            .attr("id", "selectButton")

    // add the options to the button
    select_button.selectAll('myOptions')
        .data(rows)
        .enter()
            .append('option')
        .text(function (row) { return row; }) // text showed in the menu
        .attr("value", function (row) { return row; }) // corresponding value returned by the button

    d3.select("#selectButton").on("change", function(d) {
        let dropdown_value = d3.select(this)
                            .property("value");
        
        // create empty obj to hold clip counts (data table)
        let q_totals = {};
        // cycle through each qualifier and add an element to the obj
        for (q of qualifier_names(data)) {
            q_totals[q] = count_clips_w_qualifier(data, dropdown_value, q);
        };
        // if any object has a total of 0 it is removed from the object
        for (pair in q_totals) {
            if (q_totals[pair] === 0) {delete q_totals[pair];};
        };
        d3.selectAll("#bars").remove();
        d3.select(".container.mt-3").append("div").attr("id", "bars");
        create_bar_horizontal(q_totals, "#bars");
    });
};

function create_bootstrap_grid_old(rows, columns, mergedColumns) {
    // Select the body element
    const body = d3.select("body");

    // Create a container div
    const container = body.append("div")
        .attr("class", "container");

    // Create rows
    for (let i = 0; i < rows; i++) {
        const row = container.append("div")
            .attr("class", "row my-2");

        // Create columns for each row
        for (let j = 0; j < columns; j++) {
            const columnSize = Math.floor(12 / columns); // Calculate the size of each column
            const columnId = String.fromCharCode(65 + j) + (i + 1); // Generate the id as A1, A2, A3, B1, B2, B3, etc.

            const cell = row.append("div")
                .attr("class", `col-md-${columnSize} py-2`)
                .attr("id", columnId)

            // Merge columns if specified
            if (mergedColumns && mergedColumns.includes(columnId)) {
                cell.attr("class", `col-md-${columnSize * 2} py-2`);
                j++; // Skip the next column
            }
        }
    }
};
