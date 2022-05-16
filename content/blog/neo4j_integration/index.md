---
title: "Integrating JSON data to your Neo4j Stack"
date: "2022-05-16T14:40:32.169Z"
description: "Integrate JSON data from a rest API into your Neo4j Stack"
author: Justin napolitano
image: post-image.jpeg
imageAlt: Justin Napolitano
---



## Introduction

In a previous [post](https://blog.jnapolitano.io/loc_crawler/), I detailed the process of crawling the Library of Congress API to generate json files that could be intergrated into you DB of choice.  

In this discussion, we will integrate JSON data into a Neo4j graph database.  

## Overview

The process is fairly straightforward.  The most difficult part is wrangling your json data into the right format for integration.  

The main function first instantiates the database config informormation.  It then gets the cwd from a context manager.  We then import the files to be integrated.  A master subject table is created to record only unique subjects to avoid duplicates.  Finally, a json pipeline extracts the data from json, transforms it to integrate into neo4j, and finally we upload using the neomodels api.  


```
if __name__ == "__main__":
    neo_applified = instantiate_neo_model_api()
    cwd = get_cwd()
    file_list = get_files(cwd = cwd)
    master_subject_table = create_master_subject_table()
    json_pipeline(file_list=file_list, master_subject_table=master_subject_table)
```


## Instantiate Neo Model Api

I extended the neo model api with a few helper functions.  The repo is found at [https://github.com/justin-napolitano/neo4jAPI](https://github.com/justin-napolitano/neo4jAPI).

You can also review the snapshot below.  

We will be calling the initation function to set the config information, update, create Case, and Create Subject classes during this review.  

create subject calls the custom subject class and returns an object that can later be integrated into the db with the .save() function.  

create case does exactly the same.  

```
from dataclasses import dataclass
from datetime import date
from shelve import Shelf
from neomodel import (config, StructuredNode, StringProperty, IntegerProperty,
    UniqueIdProperty, RelationshipTo, BooleanProperty, EmailProperty, Relationship, db)
from pprint import pprint

class neoAPI():

    def __init__(self,uri,user,psw):
        self.db_init = self.instantiate_neo_model_session(uri,user,psw)    
        
    
    def instantiate_neo_model_session(uri,user,psw):
        
        #config.DATABASE_URL = 'neo4j+s://{}:{}@{}'.format(user, psw, uri)
        config.DATABASE_URL ='bolt://neo4j:beautiful@localhost:7687'
        #config.DATABASE_URL = uri
        return True


    def standard_query():
        results, meta = db.cypher_query(query, params)
        people = [Person.inflate(row[0]) for row in results]

    def create_case_node(date, dates, group,name, pdf, shelf_id, subject, title, url, subject_relationship = True):
        return Case(date=date, dates=dates, group=group,name=name, pdf=pdf, shelf_id=shelf_id, subject=subject, title=title, url=url)


    def create_city_node(name):
        return City(name = name)
        
    def create_country_node(code,name):
        return Country(code = code, name = name)

    def create_state_node(code,name):
        return State(code = code, name = name)

    def create_realtor_search_url_node(url):
        return Realtor_Search_URL(url = url, is_root = True, is_sibling = True, is_parent= False, is_child = False, searched = False)
    
    def create_root_node(url, name = 'realtor.com'):
        return Root(is_root = True,name = name,is_parent =False, is_sibling = False, is_child = False, url = url)
        uid = UniqueIdProperty()

    def create_child_node(url, name = 'realtor.com'):
        return Child(is_root = True,name = name,is_parent =False, is_sibling = False, is_child = False, url = url)

    def create_parent_node(url, name = 'realtor.com'):
        return Parent(is_root = True,name = name,is_parent =False, is_sibling = False, is_child = False, url = url)

    def create_sibling_node(url, name = 'realtor.com'):
        return Sibling(is_root = True,name = name,is_parent =False, is_sibling = False, is_child = False, url = url)
    
    def create_relationship(source,target):
      
        
        rel = source.connect(target)
        return rel

        #print("{}"+".connect" + "{}".format(source,target))
        
    def create_subject_node(name = None,):
        return Subject(name = name)

    def update(obj):
        with db.transaction:
            return obj.save()

class Subject(StructuredNode):
    uuid = UniqueIdProperty()
    name = StringProperty(unique_index=True, required=True)


class Case(StructuredNode):
    uid = UniqueIdProperty()
    date = StringProperty(unique_index=True, required=True)
    dates = StringProperty(unique_index=True, required=True)
    group = StringProperty(unique_index=True, required=True)
    name = StringProperty(unique_index=True, required=True)
    pdf = StringProperty(unique_index=True, required=True) 
    shelf_id = StringProperty(unique_index=True, required=True)
    subject = StringProperty(unique_index=True, required=True)
    #primary_topic = StringProperty(unique_index=True, required=True)
    title = StringProperty(unique_index=True, required=True)
    url = StringProperty(unique_index=True, required=True)
    subject_relationship = Relationship("Subject", "IS_SUBJECT")

class Processed(StructuredNode):
    uid = UniqueIdProperty()

class NotProcessed(StructuredNode):
    uid = UniqueIdProperty()
    

class City(StructuredNode):
    uid = UniqueIdProperty()
    name = StringProperty(unique_index=True, required=True)
    state = Relationship('State', 'IS_STATE_OF')
    country = Relationship('Country', 'IS_COUNTRY_OF')
    
    
class Country(StructuredNode):
    uid = UniqueIdProperty()
    code = StringProperty(unique_index=True, required=True)
    name = StringProperty(unique_index=True, required=True)
    

class State(StructuredNode):
    uid = UniqueIdProperty()
    code = StringProperty(unique_index=True, required=True)
    name = StringProperty(unique_index=True, required=True)
    country = Relationship('Country', 'IS_COUNTRY_OF')

class Root(StructuredNode):
    uid = UniqueIdProperty()
    is_root = BooleanProperty(unique_index = True, required = True)
    is_parent = BooleanProperty(unique_index = True, required = True)
    is_sibling = BooleanProperty(unique_index = True, required = True)
    is_child = BooleanProperty(unique_index = True, required = True)
    name = StringProperty(unique_index = True, required = False)
    url = StringProperty()
    processed = Relationship("Processed", "IS_PROCESSED")
    NotProcessed = Relationship("NotProcessed", "NOT_PROCESSED")
    sibling = Relationship("Sibling","IS_SIBLING")
    child = Relationship("Child","IS_CHILD")
    parent = Relationship("Parent","IS_PARENT")
    root = Relationship("Root", "IS_ROOT")

class Child(StructuredNode):
    uid = UniqueIdProperty()
    is_root = BooleanProperty(unique_index = True, required = True)
    is_parent = BooleanProperty(unique_index = True, required = True)
    is_sibling = BooleanProperty(unique_index = True, required = True)
    is_child = BooleanProperty(unique_index = True, required = True)
    name = StringProperty()
    processed = Relationship("Processed", "IS_PROCESSED")
    NotProcessed = Relationship("NotProcessed", "NOT_PROCESSED")
    sibling = Relationship("Sibling","IS_SIBLING")
    child = Relationship("Child","IS_CHILD")
    parent = Relationship("Parent","IS_PARENT")
    root = Relationship("Root", "IS_ROOT")

class Parent(StructuredNode):
    uid = UniqueIdProperty()
    name = StringProperty()
    is_root = BooleanProperty(unique_index = True, required = True)
    is_parent = BooleanProperty(unique_index = True, required = True)
    is_sibling = BooleanProperty(unique_index = True, required = True)
    is_child = BooleanProperty(unique_index = True, required = True)
    processed = Relationship("Processed", "IS_PROCESSED")
    NotProcessed = Relationship("NotProcessed", "NOT_PROCESSED")
    sibling = Relationship("Sibling","IS_SIBLING")
    child = Relationship("Child","IS_CHILD")
    parent = Relationship("Parent","IS_PARENT")
    root = Relationship("Root", "IS_ROOT")


class Sibling(StructuredNode):
    uid = UniqueIdProperty()
    is_root = BooleanProperty(unique_index = True, required = True)
    is_parent = BooleanProperty(unique_index = True, required = True)
    is_sibling = BooleanProperty(unique_index = True, required = True)
    is_child = BooleanProperty(unique_index = True, required = True)
    name = StringProperty()
    processed = Relationship("Processed", "IS_PROCESSED")
    NotProcessed = Relationship("NotProcessed", "NOT_PROCESSED")
    sibling = Relationship("Sibling","IS_SIBLING")
    child = Relationship("Child","IS_CHILD")
    parent = Relationship("Parent","IS_PARENT")
    root = Relationship("Root", "IS_ROOT")
    
class Realtor_com(StructuredNode):
    uid = UniqueIdProperty()
    is_realtor_com = BooleanProperty(unique_index = True, required = True)
    name = StringProperty()

class Realtor_Search_URL(StructuredNode):
    uid = UniqueIdProperty()
    url = StringProperty(unique_index=True, required=True)
    searched = BooleanProperty(unique_index = True, required = True)
    is_root = BooleanProperty(unique_index = True, required = True)
    is_child = BooleanProperty(unique_index = True, required = True)
    is_parent = BooleanProperty(unique_index = True, required = True)
    is_sibling = BooleanProperty(unique_index = True, required = True)
    #state = Relationship('State', 'OF')
    state = Relationship('State', 'IS_STATE_OF')
    city = Relationship('City', 'IS_CITY_OF')
    root = Relationship('Root','IS_ROOT')
    child = Relationship('Child',"IS_CHILD")
    parent = Relationship('Parent', "IS_PARENT")
    sibling = Relationship('Sibling', "IS_SIBLING")
    realtor_com = Relationship('Realtor_com', "IS_REALTOR.COM_URL")
    processed = Relationship("Processed", "IS_PROCESSED")
    NotProcessed = Relationship("NotProcessed", "NOT_PROCESSED")


class Person(StructuredNode):
    uid = UniqueIdProperty()
    full_name = StringProperty(required = True)
    email = EmailProperty()
```

## Get Files

The get_files function returns a list of files within the input directory.  

```

def get_files(cwd =os.getcwd(), input_directory = 'input'):
    
    path = os.sep.join([cwd,input_directory])
    file_list= [f for f in glob.glob(path + "**/*.json", recursive=True)]
  
    return file_list

```

## Create Master Subject File

Create maseter subject table generates an empty dataframe that will record every unique subject experienced in the data.  

I will improve upon this later, by uploading a master file that will be saved following each modification.  This would enable resuming the process following an error or fault.  

```

def create_master_subject_table():
    table = pd.DataFrame()
    table['subject']= np.nan
    table['transaction']= np.nan
    table['submitted'] = np.nan
    return(table)

```

## Json Pipeline function

The json pipeline function is the runner for the etl job.  It loads each file into dataframe, manipulates the data accordingly, and updates the neo4j database.  

When I refactor the code, I will most likely create an object that calls static functions to generate then desired output.  


I may also seperate the case, subject, and relationship pipeline into seperate classes in order to avoid shadowing functions within functions.  



```
def json_pipeline(file_list, master_subject_table):
    case_counter = 0
    for file in file_list:
        
        data = load_json_data(file=file)
        data = data['results']
        #pprint(data)
        #pprint(data[0])
        
        #filtered_data = filter_json_data(json_data = data, filter = filter)

        # Creating the case nodes transaction nodes and df
        data = clean_json_data(data)
        case_data = stringify_json_values(data)
        case_data = pandify_case_data(case_data)
        case_data = nodify_case_data(case_data = case_data)
        
        # Creating the subject nodes transaction nodes and df
        subject_list = slice_subject_data(data)
        subject_list = identify_unique_subjects(subject_list)
        subject_lookup_table = create_subject_lookup_table(subject_list)
        master_subject_table = integrate_to_master_table(subject_lookup_table,master_subject_table)
        #pprint(master_subject_table.duplicated())
        case_counter = case_counter + len(case_data)

        master_subject_table = nodify_subjects(master_subject_table)

        #pprint(case_data)
        #pprint(master_subject_table['transaction'])
        #lets save data to the database

        master_subject_table = submit_subjects_to_db(master_subject_table)
        case_data = submit_cases_to_db(case_data = case_data)

        # Create Relationships

        relationship_list= create_relationship_table(case_data=case_data, master_subject_table=master_subject_table)
```

