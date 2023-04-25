import motor.motor_asyncio
from fastapi import FastAPI
from model import *
from fastapi import Depends

app = FastAPI()

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')

# Database collections
database = client.TheCollectors
clubs_collection = database.Clubs
orgs_collection = database.Organizations
events_collection = database.Events
users_collection = database.Users

async def fetch_one_club(name, find_org = False):
    """Return the specified club or organization in the database."""
    if find_org:
        document = await orgs_collection.find_one({"name": name})
    else:
        document = await clubs_collection.find_one({"name": name})
    return document

async def fetch_all_events_with_clubName(clubName):
    """Return the specified event in the database."""
    cursor = events_collection.find({"clubName": clubName})
    events = []
    async for document in cursor:
        events.append(Event(**document))
    return events

async def fetch_all_clubs(find_orgs = False):
    """Return a list of all clubs OR organizations in the database."""
    if find_orgs:
        cursor = orgs_collection.find({})
    else:
        cursor = clubs_collection.find({})
    clubs = []
    async for document in cursor:
        clubs.append(Club(**document))
    return clubs

async def fetch_all_clubsorgs():
    """Return a list of all clubs AND organizations in the database."""
    cursor = orgs_collection.find({})
    cursor2 = clubs_collection.find({})
    clubs = []
    async for document in cursor:
        clubs.append(Club(**document))
    async for document in cursor2:
        clubs.append(Club(**document))
    return clubs

async def fetch_all_events():
    """Return a list of events in the database."""
    cursor = events_collection.find({})
    events = []
    async for document in cursor:
        events.append(Event(**document))
    return events

async def create_club(club, create_org = False):
    """Add a specified club or organization to the database."""
    if create_org:
        await orgs_collection.insert_one(club)
    else:
        await clubs_collection.insert_one(club)
    return club

async def create_event(event):
    """Add a specified event to the database."""
    await events_collection.insert_one(event)
    return event

async def update_club(name, desc, size, status, email, image, update_org = False):
    """Update a specified club in the database."""
    if update_org:
        await orgs_collection.update_many({"name": name},
                                          {"$set": {"description": desc,
                                                    "size": size,
                                                    "status": status,
                                                    "email": email,
                                                    "image": image}})
        document = await orgs_collection.find_one({"name": name})
    else:
        await clubs_collection.update_many({"name": name},
                                           {"$set": {"description": desc,
                                                     "size": size,
                                                     "status": status,
                                                     "email": email,
                                                     "image": image}})
        document = await clubs_collection.find_one({"name": name})
    return document

async def remove_club(name, remove_org = False):
    """Remove a specified club in the database."""
    if remove_org:
        return await orgs_collection.delete_one({"name": name})
    else:
        return await clubs_collection.delete_one({"name": name})

async def remove_event(name):
    """Remove the specified event from the database."""
    return await events_collection.delete_one({"name": name})

async def add_tag(name, tag, org_tag = False):
    """Add specified tags to the club or organization."""
    if org_tag:
        await orgs_collection.update_one({"name": name}, {"$push": {"tags": tag}})
        document = await orgs_collection.find_one({"name": name})
    else:
        await clubs_collection.update_one({"name": name}, {"$push": {"tags": tag}})
        document = await clubs_collection.find_one({"name": name})
    return document

async def remove_tag(name, tag, org_tag = False):
    """Remove specified tags from the club or organization."""
    if org_tag:
        await orgs_collection.update_one({"name": name}, {"$pull": {"tags": tag}})
        document = await orgs_collection.find_one({"name": name})
    else:
        await clubs_collection.update_one({"name": name}, {"$pull": {"tags": tag}})
        document = await clubs_collection.find_one({"name": name})
    return document

async def create_user(user):
    # Asynchronously insert a new user document into a MongoDB collection.
    await users_collection.insert_one(user)
    return user

def verify_password(plain_password, stored_password):
    return plain_password == stored_password

async def fetch_one_user(email: str):
    # Asynchronously find and retrieve a single user document from a MongoDB collection by email.
    document = await users_collection.find_one({"email": email})
    return document

async def fetch_one_user_by_email(email: str):
    """Asynchronously find and retrieve a single user document from a MongoDB collection by email."""
    document = await users_collection.find_one({"email": email})
    return document

async def update_user(email: str, major: str, graduate_year: str, discord: str, description: str):
    """Update a specified user's profile in the database."""
    await users_collection.update_one({"email": email},
                                      {"$set": {"major": major,
                                                "graduate_year": graduate_year,
                                                "discord": discord,
                                                "description": description}})
    document = await users_collection.find_one({"email": email})
    return document

