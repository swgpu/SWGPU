import json
from pathlib import Path
import re
import argparse

docs_file = "docs.json"
docs_json = ""
welcome_page = ""
modules_file = "./docs/modules.json"
output_dir = "./docs/pukiwiki"

def search_by_property_recursive(data, property_name, property_value):
    if isinstance(data, list):
        for obj in data:
            result = search_by_property_recursive(obj, property_name, property_value)
            if result:
                return result
    elif isinstance(data, dict):
        if property_name in data and data[property_name] == property_value:
            return data
        for key, value in data.items():
            result = search_by_property_recursive(value, property_name, property_value)
            if result:
                return result
    return None


def search_by_property(json_file, property_name, property_value):
    with open(json_file, 'r', encoding="utf-8") as f:
        data = json.load(f)
    return search_by_property_recursive(data, property_name, property_value)


def get_class_title(warme_class):
    class_title = ""
    try:
        class_title += "* Class: " + warme_class["name"] + "\n"
        class_title += "\n"
    except KeyError as e:
        pass
    return class_title


def get_class_description(obj):
    description = ""
    try:
        summary = obj["comment"]["summary"]
        for txt_obj in summary:
            description += "" + txt_obj["text"]
        description = description.replace("\n", "~\n")
        description += "~\n"
    except KeyError as e:
        pass
    return description


def get_class_hierarchy(warme_class):
    hierarchy = ""
    try:
        extend_types = warme_class["extendedTypes"]
        hierarchy += "- " + "inherit from: " + extend_types[0]["name"] + "~\n"
    except KeyError as e:
        pass
    try:
        extended_by = warme_class["extendedBy"]
        hierarchy += "- " + "parent of: "
        for child in extended_by:
            hierarchy += child["name"]
            if extended_by.index(child) != len(extended_by) - 1:
                hierarchy += ", "
            else:
                hierarchy += "~\n"
    except KeyError as e:
        pass
    return hierarchy


def get_class_table_of_contents(warme_class):
    table_of_contents = ""
    try:
        groups = warme_class["groups"]
        table_of_contents += "\n"
        table_of_contents += "\n"
        table_of_contents += "** Table of Contents\n"
        for group in groups:
            table_of_contents += "*** " + group["title"] + "\n"
            for id in group["children"]:
                object = search_by_property(docs_file, "id", id)
                table_of_contents += "- " + object["name"] + "\n"
    except KeyError as e:
        pass
    return table_of_contents


def get_group_title(group):
    group_title = ""
    try:
        group_title += "** " + group["title"] + "\n"
    except KeyError as e:
        pass
    return group_title


def get_function_name(function):
    function_name = ""
    try:
        # function_name += "*** " + function["name"] + "\n"
        try:
            f_is_static = function["flags"]["isStatic"]
            if f_is_static == True:
                function_name = "- " + "'''" + "static" + "''' " + "''" + function["signatures"][0]["name"] + "''"
        except KeyError as e:
            function_name += "- " + "''" + function["signatures"][0]["name"] + "''"
    except KeyError as e:
        pass
    return function_name


def get_function_parameters(function):
    function_parameters = ""
    try:
        parameters = function["signatures"][0]["parameters"]
        function_parameters += "("
        for parameter in parameters:
            function_parameters += parameter["name"]
            try:
                function_parameters += ": " + parameter["type"]["name"]
            except KeyError as e:
                try:
                    if parameter["type"]["type"] == "array":
                        function_parameters += ": " + parameter["type"]["elementType"]["name"] + "[]"
                except KeyError as e:
                    pass
            if parameters.index(parameter) != len(parameters) - 1:
                function_parameters += ", "
            else:
                function_parameters += ")"
    except KeyError as e:
        function_parameters = "()"
    return function_parameters


def get_function_return_type(function):
    function_return_type = ""
    try:
        return_type_obj = function["signatures"][0]["type"]
        function_return_type += ": " + return_type_obj["name"]
        function_return_type += "~\n"
    except KeyError as e:
        function_return_type = "~\n"
    return function_return_type


def get_function_description(function):
    function_description = ""
    try:
        for txt_obj in function["signatures"][0]["comment"]["summary"]:
            function_description += txt_obj["text"]
        function_description = function_description.replace("\n", "~\n")
        function_description += "~\n"
    except KeyError as e:
        pass
    return function_description


def get_function_parameters_table(function):
    function_parameters_table = ""
    try:
        parameters = function["signatures"][0]["parameters"]
        function_parameters_table += "''Parameters''" + "\n"
        function_parameters_table += "| ~Name | ~Type | ~Default Value | ~Description |h\n"
        for parameter in parameters:
            function_parameters_table += "|"
            function_parameters_table += " " + parameter["name"] + " |"
            function_parameters_table += " " + parameter["type"]["name"] + " |"
            try:
                function_parameters_table += " " + parameter["defaultValue"] + " |"
            except KeyError as e:
                function_parameters_table += " undefined |"
            function_parameters_table += " "
            for txt_obj in parameter["comment"]["summary"]:
                function_parameters_table += txt_obj["text"]
            function_parameters_table += " |\n"
    except KeyError as e:
        pass
    return function_parameters_table


def get_function_parameters_list(function):
    function_parameters_list = ""
    try:
        parameters = function["signatures"][0]["parameters"]
        for parameter in parameters:
            f_type_here = False
            try:
                function_parameters_list += "-- ''" + parameter["name"] + "''"
            except KeyError as e:
                pass
            try:
                txt = ""
                for txt_obj in parameter["comment"]["summary"]:
                    txt += txt_obj["text"]
                function_parameters_list += ": " + txt
            except KeyError as e:
                pass
            function_parameters_list += "~\n"
    except KeyError as e:
        if function_parameters_list != "":
            function_parameters_list += "~\n"
    return function_parameters_list


def get_function_return_info(function):
    function_return_info = ""
    try:
        return_type_obj = function["signatures"][0]["type"]
        function_return_info += "-- '' returns ''"
        description_obj = function["signatures"][0]["comment"]["blockTags"][0]["content"]
        function_return_info += ": "
        for txt_obj in description_obj:
            function_return_info += txt_obj["text"]
        function_return_info += "~\n"
    except KeyError as e:
        function_return_info += "~\n"
    return function_return_info


def get_class_group_function_content(id):
    function = search_by_property(docs_file, "id", id)
    function_content = ""
    if function != None:
        if function["signatures"][0]["name"].startswith("$"):
            return ""
        try:
            test = function["signatures"][0]["inheritedFrom"]
            print("Inherited " + function["signatures"][0]["name"])
            print(test)
            return ""
        except KeyError as e:
            pass
        function_content += get_function_name(function)
        function_content += get_function_parameters(function)
        function_content += get_function_return_type(function)
        function_content += get_function_description(function)
        # function_content += get_function_parameters_table(function)
        function_content += get_function_parameters_list(function)
        # function_content += get_function_return_info(function)
    else:
        pass
    return function_content


def get_class_groups_content(warme_class):
    class_groups_content = ""

    try:
        for group in warme_class["groups"]:
            i = 0
            if group["title"] not in ["Properties", "Accessors"]:
                class_groups_content += get_group_title(group)
            if group["title"] in ["Constructors", "Methods"]:
                for id in group["children"]:
                    function_content = get_class_group_function_content(id)
                    if i >= 1 and function_content != "":
                        class_groups_content += "~\n"
                    class_groups_content += function_content
                    if i == 0 and function_content != "":
                        i += 1
            elif group["title"] in ["Properties"]:
                pass
    except KeyError as e:
        pass
    return class_groups_content


def create_class_page(warme_class):
    out = ""
    out += get_class_title(warme_class)
    out += get_class_description(warme_class)
    out += get_class_hierarchy(warme_class)
    # out += get_class_table_of_contents(warme_class)
    out += get_class_groups_content(warme_class)
    return out


def create_pukiwiki_pages():
    modules_already_added = []
    welcome_page = "* Welcome to WARME ENGINE\n"
    pukiwiki_pages_path = Path(output_dir)

    # If PukiWiki pages directory doesn't exist, create it !
    if not pukiwiki_pages_path.exists():
        pukiwiki_pages_path.mkdir()
    # Else delete old PukiWiki pages
    else:
        for child in pukiwiki_pages_path.iterdir():
            child.unlink()
    # For each module, do that
    for warme_module in docs_modules:
        modules_groups = []
        try:
            # If there are any modules, everything go well
            if len(warme_module["children"]) > 0:
                modules_groups = warme_module["groups"]
            # Else, stop everything !
            else:
                break

            # Search module name
            module_name = ""
            matches = re.search(".+(?=/.+)", warme_module["name"])
            # If you find something, get it !
            if matches:
                if "_" in matches[0]:
                    module_name = matches[0].split("_")[0]
                else:
                    module_name = matches[0]
            # If module name is not empty, create his page
            if module_name != "":
                module_file = pukiwiki_pages_path / (module_name.encode().hex().upper() + ".txt")
                if not module_file.exists():
                    module_file_content = "* " + module_name.capitalize() + "\n"
                    with open(modules_file, "r", encoding="utf-8") as f:
                        modules_json = json.load(f)
                        for name in modules_json:
                            if name.lower() == module_name:
                                module_file_content += modules_json[name] + "~\n"
                                break
                    module_file.write_text(module_file_content)
            # For each class of module, create a page
            for group in modules_groups:
                if group["title"] == "Classes":
                    for id in group["children"]:
                        print(id)
                        warme_class = search_by_property(docs_file, "id", id)
                        print(warme_class["name"])
                        class_page = create_class_page(warme_class)
                        page_path = pukiwiki_pages_path / (warme_class["name"].encode().hex().upper() + ".txt")
                        page_path.write_text(class_page, encoding="utf-8")
                        with module_file.open("a") as f:
                            f.write("- [[" + warme_class["name"] + "]]~\n")
            # If you didn't add this module to welcome page, add it !
            if module_name not in modules_already_added:
                welcome_page += "- " + "[[" + module_name.capitalize() + ">" + module_name + "]]" + "\n"
                modules_already_added.append(module_name)
            print(modules_already_added)
        except KeyError:
            continue
    # Create Welcome page !
    welcome_page_path = pukiwiki_pages_path / ("WARME Index".encode().hex().upper() + ".txt")
    welcome_page_path.write_text(welcome_page)

# Main Function
if __name__ == "__main__":
    # Management of script's arguments
    parser = argparse.ArgumentParser(description="Convert TypeDoc JSON to PukiWiki Files")
    parser.add_argument("--json", "-j", help="Path to the JSON file")
    parser.add_argument("--output", "-o", help="Path to the Folder where PukiWiki will be generated")
    args = parser.parse_args()

    if args.json != None:
        if Path(args.json).is_file():
            docs_file = args.json
    if args.output != None:
        if Path(args.json).is_dir():
            output_dir = args.json

    # Get data from JSON File
    with open(docs_file, "r", encoding="utf-8") as f:
        docs_json = json.load(f)

    # Create PukiWiki Pages
    docs_modules = docs_json["children"]
    create_pukiwiki_pages()
