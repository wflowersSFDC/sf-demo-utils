# summary

Creates a scratch org

# description

Allows the user to set the username prefix and domain of the username, then creates an org with a unique username based on the info provided

# examples

- sf demoutil org create scratch -p ace -e ventura.com -d 20 -w 10 -f config/project-scratch-def.json -s

# flags.userprefix.summary

Prefix for username. Example: a prefix of 'test' would yield a username like 'test1@example.com'

# flags.userdomain.summary

Domain for username. Example: a domain of 'test.com' would yield a username like 'example1@test.com'

# flags.definitionfile.summary

Path to a scratch org definition file.

# flags.durationdays.summary

Number of days before the org expires.

# flags.wait.summary

Number of minutes to wait for the scratch org to be ready.

# flags.clientid.summary

Consumer key of the Dev Hub connected app.

# flags.setalias.summary

Alias for the scratch org.

# flags.noancestors.summary

Don't include second-generation managed package (2GP) ancestors in the scratch org.

# flags.nonamespace.summary

Create the scratch org with no namespace, even if the Dev Hub has a namespace.

# flags.setdefaultusername.summary

Set the scratch org as your default org
