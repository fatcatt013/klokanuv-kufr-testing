from django import template

register = template.Library()


@register.filter(name='split')
def split(value, key):
    """
    Returns the value turned into a list.
    """
    return value.split(key)


@register.filter(name='concat')
def modulo(v1, v2):
    return str(v1) + str(v2)


@register.filter(name='divide')
def modulo(num, val):
    return num // val
