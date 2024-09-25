# SF Demo Utils CLI Plugin Documentation

Welcome to the documentation for the `sf-demo-utils` Salesforce CLI plugin. This plugin provides a set of commands designed to assist with managing and automating various tasks related to Salesforce development, such as creating scratch orgs, updating transaction security policies, and setting user passwords.

## Overview

The `sf-demo-utils` plugin is an extension for the Salesforce CLI, enabling users to perform specific actions without leaving their terminal environment. The primary commands available through this plugin include:

1. **Create Scratch Org**: Automatically provisions a new scratch org based on a provided configuration file and sets it as the default username if specified.
2. **Update Transaction Security Policies**: Updates transaction security policies in a specified directory to use the current user's username.
3. **Set User Password**: Allows administrators to set or reset the password for a user identified by their first and last name.

## Installation

To install the `sf-demo-utils` plugin, you can use the following command:

```sh
sf plugins install sf-demo-utils
```

## Commands

### 1. Create Scratch Org

#### Summary

Creates a scratch org with a unique username based on provided prefix and domain.

#### Description

This command allows users to set the username prefix and domain, then generates a new org using these parameters along with other optional flags such as duration and namespace settings. The generated org's default username is automatically set if specified.

#### Examples

```sh
sf demoutil org create scratch -p ace -e ventura.com -d 20 -w 10 -f config/project-scratch-def.json -s
```

### 2. Update Transaction Security Policies

#### Summary

Updates transaction security policies in a specified directory to use the current user's username.

#### Description

This command reads through all applicable policy files in the given directory and updates them to include the currently set username, ensuring consistency across environments.

#### Examples

```sh
sf demoutil tsp update -d /your/project/directory
```

### 3. Set User Password

#### Summary

Sets or resets a user's password based on their first and last name.

#### Description

Users can specify the first and last names of the target user to reset their password securely, ensuring that all necessary permissions are met before making changes.

#### Examples

```sh
sf demoutil user password set -l User -f John -p newPassword123
```

## Usage

Each command can be invoked with specific flags and arguments as outlined in the examples provided above. Ensure you have the necessary permissions to execute these actions within your Salesforce environment.

## Support

For further assistance or if you encounter any issues, please refer to the official documentation for each command or contact support@salesforce.com.

---

Thank you for using the `sf-demo-utils` plugin! We hope this documentation aids in your automation and development workflows on Salesforce platforms.
