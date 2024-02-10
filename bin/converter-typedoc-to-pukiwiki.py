import json
from pathlib import Path
import re

docs_file = "docs.json"
docs_json = ""
welcome_page =""

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


'''
# Exemple d'utilisation :
result = search_by_property('docs.json', 'id', 10)
if result:
    print(json.dumps(result, indent=4, sort_keys=True))
else:
    print("Aucun objet trouvé avec cette propriété.")
'''


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
        description += "\n"
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
        #function_name += "*** " + function["name"] + "\n"
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
        function_content += get_function_name(function)
        function_content += get_function_parameters(function)
        function_content += get_function_return_type(function)
        function_content += get_function_description(function)
        #function_content += get_function_parameters_table(function)
        function_content += get_function_parameters_list(function)
        #function_content += get_function_return_info(function)
    else:
        pass
    return function_content

def get_class_groups_content(warme_class):
    class_groups_content = ""

    try:
        for group in warme_class["groups"]:
            i = 0
            if group["title"] != "Properties":
                class_groups_content += get_group_title(group)
            if group["title"] in ["Constructors", "Methods"]:
                for id in group["children"]:
                    if i >= 1:
                        class_groups_content += "~\n"
                    function_content = get_class_group_function_content(id)
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
    #out += get_class_table_of_contents(warme_class)
    out += get_class_groups_content(warme_class)
    return out


def create_modules_pages():
    modules_already_added = []
    welcome_page = "* Welcome to WARME ENGINE\n"
    result_path = Path("./result")
    if not result_path.exists():
        result_path.mkdir()
    else:
        for child in result_path.iterdir():
            child.unlink()
    for warme_module in docs_modules:
        modules_groups = []
        try:
            if len(warme_module["children"]) > 0:
                modules_groups = warme_module["groups"]
            else:
                break
            module_name = ""
            matches = re.search(".+(?=/.+)", warme_module["name"])
            if matches:
                if "_" in matches[0]:
                    module_name = matches[0].split("_")[0]
                else:
                    module_name = matches[0]
            if module_name != "":
                module_file = result_path / (module_name.encode().hex().upper() + ".txt")
                if not module_file.exists():
                    module_file_content = "* " + module_name.capitalize() + "\n\n"
                    module_file.write_text(module_file_content)
            for group in modules_groups:
                if group["title"] == "Classes":
                    for id in group["children"]:
                        print(id)
                        warme_class = search_by_property(docs_file, "id", id)
                        print(warme_class["name"])
                        class_page = create_class_page(warme_class)
                        page_path = result_path / (warme_class["name"].encode().hex().upper()+".txt")
                        page_path.write_text(class_page)
                        with module_file.open("a") as f:
                            f.write("- [[" + warme_class["name"] + "]]~\n")
            if module_name not in modules_already_added:
                welcome_page += "- " + "[[" + module_name.capitalize() + ">" + module_name + "]]" + "\n"
                modules_already_added.append(module_name)
            print(modules_already_added)
        except KeyError:
            continue
    welcome_page_path = result_path / ("WARME Index".encode().hex().upper() + ".txt")
    welcome_page_path.write_text(welcome_page)


'''
for warme_module in docs_modules:
    modules_groups = []
    try:
        if len(warme_module["children"]) > 0:
            modules_groups = warme_module["children"]
        else:
            break

        for class_child in warme_module["children"]:
            out += "* Class" + class_child["name"] + "\n"
            out += "\n"
            for txt_obj in class_child["comment"]["summary"]:
                out += "" + txt_obj["text"]
            out += "\n"
            out += "\n"
            out += "** Table of Contents\n"
            for content_group in modules_groups:
                out += "*** " + content_group["title"]
                for id in content_group["children"]:
                    print()
                    object = search_by_property(docs_file, "id", id)
                    out += "- " + object["name"]
            break
        print(out)
        break
    except KeyError:
        continue
'''

with open(docs_file, "r", encoding="utf-8") as f:
    docs_json = json.load(f)
docs_modules = docs_json["children"]
create_modules_pages()
