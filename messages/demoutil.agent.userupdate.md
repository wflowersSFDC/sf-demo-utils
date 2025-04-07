# summary

Updates Einstein Agent User in bot metadata files.

# description

Finds the user with profile 'Einstein Agent User' and updates the botUser tag in Einstein Service Agent bots.

# flags.directory.summary

Directory containing bot metadata files. Default is force-app/main/default.

# examples

- <%= config.bin %> <%= command.id %>
- <%= config.bin %> <%= command.id %> -d /your/project/directory

# error.noUsername

No username found in the default org. Please authenticate to an org first.

# error.noEinsteinAgentUser

No user with 'Einstein Agent User' profile found in the org.

# error.noBotsDirectory

No bots directory found at the specified location.

# error.noBotsFound

No bot files found in the bots directory.

# success.updated

Updated %s bot file(s) with Einstein Agent User: %s.

# info.noUpdateNeeded

No bot files needed updating.

# flags.name.summary

Description of a flag.

# flags.name.description

More information about a flag. Don't repeat the summary. 

